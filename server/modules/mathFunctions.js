const allowedOperators = ["+", "-", "*", "/"];

module.exports = {
  checkNumbers,
  doMath,
  checkOperator,
  findOps,
  cleanDecimals,
};

function checkNumbers(array) {
  const mathObject = {};

  // Convert Operands to Numbers
  mathObject.firstOperand = Number(array[0]);
  mathObject.secondOperand = Number(array[1]);
  mathObject.operator = array[2];

  // Check if NaN and return undefined if it is
  // (don't return NaN as Object check is always NaN, check undefined for guard clause);
  if (
    isNaN(Number(mathObject.firstOperand)) ||
    isNaN(Number(mathObject.secondOperand))
  )
    return undefined;
  return mathObject;
}

// Begin function to check if operator is an allowed operator
function checkOperator(mathObject) {
  const operatorOptions = ["+", "-", "*", "/"];
  if (!operatorOptions.some((item) => item === mathObject.operator)) return;
  return mathObject;
}

// Begin function to calculate math
function doMath(mathObject) {
  switch (mathObject.operator) {
    case "+":
      mathObject.total = mathObject.firstOperand + mathObject.secondOperand;
      break;
    case "-":
      mathObject.total = mathObject.firstOperand - mathObject.secondOperand;
      break;
    case "*":
      mathObject.total = mathObject.firstOperand * mathObject.secondOperand;
      break;
    case "/":
      mathObject.total = mathObject.firstOperand / mathObject.secondOperand;
      break;
    default:
      mathObject.total = "0";
      console.log("Math error!");
  }

  return mathObject;
}

// Begin function to find operands and operator
function findOps(array) {
  let tempArray = array.mathInfo.split("");
  let operatorToggle = false;
  let currentOperator = "";
  let firstOperand = "";
  let secondOperand = "";

  for (const item of tempArray) {
    if (allowedOperators.includes(item)) {
      if (item === ".") continue;
      operatorToggle = true;
      currentOperator = item;
      continue;
    }
    if (operatorToggle === false) {
      firstOperand += item;
    } else {
      secondOperand += item;
    }
  }
  return [firstOperand, secondOperand, currentOperator];
}

// Begin function to check and clean decimal to to spots
// if there is a decimal over 2
function cleanDecimals(mathArray) {
  for (let i = 0; i < mathArray.length; i++) {
    const mathObj = mathArray[i];
    if (mathObj.total.toString().includes("."))
      if (mathObj.total.toString().split(".")[1].length > 2) {
        mathObj.total = mathObj.total.toFixed(2);
      }
  }
  return mathArray;
}
