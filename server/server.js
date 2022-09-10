const express = require("express");
const prolloMath = require("./modules/mathFunctions");
const app = express();
const PORT = 5000;
const mathWithTotals = [];

// Setup Static
app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

// Setup GET and POST
app.get("/math", (req, res) => {
    res.send(mathWithTotals);
});

app.post("/math", (req, res) => {
    const incomingMath = prolloMath
        .checkNumbers(prolloMath
            .findOps(req.body));
    console.log(incomingMath);
    // Guard-clause for non-number
    if (incomingMath === undefined) return res.status(400).send("Received non-number!");
    if (prolloMath.checkOperator(incomingMath) === undefined) return res.status(400).send("Received invalid operator!");

    // Push to array after calculating total if valid data
    mathWithTotals.push(prolloMath.doMath(incomingMath));

    // Status Codes and Console Logs
    res.status(201).send("Received math data!");
    console.log("Math data received:", req.body);
});

// Setup Listen
app.listen(PORT, () => {
    console.log("Listening on Port: 5000");
});