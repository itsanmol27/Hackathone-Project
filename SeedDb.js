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

// Seed data for Portfolio investments
const portfolioData = [
  { user_id: 1, investment_type: 'Stocks', value: 10000, date: '2025-03-01' },
  { user_id: 1, investment_type: 'Bonds', value: 5000, date: '2025-03-02' },
  { user_id: 2, investment_type: 'Real Estate', value: 20000, date: '2025-03-03' },
];

const transactionData = [
  { user_id: 1, amount: 200, date: '2025-02-01', type: 'Debit' },
  { user_id: 1, amount: 500, date: '2025-02-15', type: 'Credit' },
  { user_id: 2, amount: 1000, date: '2025-02-10', type: 'Debit' },
];

const creditCardData = [
  { user_id: 1, amount: 300, date: '2025-01-15', card_type: 'Visa' },
  { user_id: 1, amount: 1000, date: '2025-03-05', card_type: 'Mastercard' },
  { user_id: 2, amount: 1200, date: '2025-02-25', card_type: 'Amex' },
];

async function seedDatabase() {
  try {

    const portfolioConnection = await mongoose.createConnection(portfolioUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const Portfolio = portfolioConnection.model('Portfolio', portfolioSchema);
    await Portfolio.insertMany(portfolioData);
    console.log('Portfolio data seeded successfully.');
    await portfolioConnection.close();

    const transactionsConnection = await mongoose.createConnection(transactionsUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const Transaction = transactionsConnection.model('Transaction', transactionSchema);
    await Transaction.insertMany(transactionData);
    console.log('Transaction data seeded successfully.');
    await transactionsConnection.close();

    const creditCardConnection = await mongoose.createConnection(creditCardUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const CreditCard = creditCardConnection.model('CreditCard', creditCardSchema);
    await CreditCard.insertMany(creditCardData);
    console.log('Credit card data seeded successfully.');
    await creditCardConnection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

seedDatabase();