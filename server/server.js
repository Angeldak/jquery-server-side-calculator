const express = require("express");
const prolloMath = require("./modules/mathFunctions");
const app = express();
const PORT = process.env.PORT || 5000;
const mathWithTotals = [];

// Setup Static
app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

// Setup GET and POST
app.get("/math", (req, res) => {
  res.send(prolloMath.cleanDecimals(mathWithTotals));
});

app.post("/math", (req, res) => {
  console.log(req.body);
  const incomingMath = prolloMath.checkNumbers(prolloMath.findOps(req.body));
  console.log(incomingMath);
  // Guard-clause for non-number
  if (incomingMath === undefined)
    return res.status(400).send("Received non-number!");
  if (prolloMath.checkOperator(incomingMath) === undefined)
    return res.status(400).send("Received invalid operator!");

  // Push to array after calculating total if valid data
  mathWithTotals.push(prolloMath.doMath(incomingMath));

  // Status Codes and Console Logs
  res.status(201).send("Received math data!");
  console.log("Math data received:", req.body);
});

// Setup DELETE to clear array
app.delete("/math", (req, res) => {
  mathWithTotals.length = 0;
  res.status(200).send("Delete request received!");
});

// Setup Listen
app.listen(PORT, () => {
  console.log("Listening on Port: 5000");
});
