const express = require("express");
const { getMergedData } = require("./getData");

const app = express();

app.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
})

app.get("/data/:userId", async (req, res) => {
    const {userId} = req.params;
    if(userId){
        const data = await getMergedData(userId);
        console.log(JSON.stringify(data));
        return res.json({ data });
    }
    else{
        return res.json({ message: "Please provide a user ID" });
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})