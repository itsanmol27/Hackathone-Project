const mongoose = require('mongoose');

// MongoDB URLs for each service
const portfolioUrl = 'mongodb://localhost:27018/portfolio_db';
const transactionsUrl = 'mongodb://localhost:27019/transactions_db';
const creditCardUrl = 'mongodb://localhost:27020/creditcard_db';

// Mongoose Schemas for Portfolio, Transactions, and Credit Card Transactions
const portfolioSchema = new mongoose.Schema({
  user_id: Number,
  investment_type: String,
  value: Number,
  date: String,
});

const transactionSchema = new mongoose.Schema({
  user_id: Number,
  amount: Number,
  date: String,
  type: String,
});

const creditCardSchema = new mongoose.Schema({
  user_id: Number,
  amount: Number,
  date: String,
  card_type: String,
});

// Connect to each MongoDB instance and create models
const connectAndMergeData = async (userId) => {
  try {
    // Connect to Portfolio MongoDB
    const portfolioConnection = await mongoose.createConnection(portfolioUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const Portfolio = portfolioConnection.model('Portfolio', portfolioSchema);
    const portfolioData = await Portfolio.find({ user_id: userId });

    // Connect to Transactions MongoDB
    const transactionsConnection = await mongoose.createConnection(transactionsUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const Transaction = transactionsConnection.model('Transaction', transactionSchema);
    const transactionData = await Transaction.find({ user_id: userId });

    // Connect to Credit Card Transactions MongoDB
    const creditCardConnection = await mongoose.createConnection(creditCardUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const CreditCard = creditCardConnection.model('CreditCard', creditCardSchema);
    const creditCardData = await CreditCard.find({ user_id: userId });

    // Merge the data from all sources based on user_id
    const mergedData = {
      user_id: userId,
      portfolio: portfolioData,
      transactions: transactionData,
      credit_cards: creditCardData,
    };

    // Close the connections
    await portfolioConnection.close();
    await transactionsConnection.close();
    await creditCardConnection.close();

    return mergedData;
  } catch (err) {
    console.error('Error merging data:', err);
  }
};

const getMergedData = async (userId) => {
  const mergedData = await connectAndMergeData(userId);
//   console.log('Merged Data for User:', userId);
//   console.log(JSON.stringify(mergedData, null, 2));
  return mergedData;
};

module.exports = { getMergedData };