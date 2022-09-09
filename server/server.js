const express = require("express");
const app = express();
const PORT = 5000;
const mathWithTotals = [];

app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/math", (req, res) => {
    res.send(mathWithTotals);
});

app.post("/math", (req, res) => {
    mathWithTotals.push(req.body);
    res.status(201).send("Received math data!");
    console.log("Math data received:", req.body);
});

app.listen(PORT, () => {
    console.log("Listening on Port: 5000");
});