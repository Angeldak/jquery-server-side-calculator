const allowedOperators = ["+", "-", "*", "/"];

module.exports = {
    checkNumbers,
    doMath,
    checkOperator,
    findOps
}

function checkNumbers(array) {
    const mathObject = {};

    // Convert Operands to Numbers
    mathObject.firstOperand = Number(array[0]);
    mathObject.secondOperand = Number(array[1]);
    mathObject.operator = array[2];

    // Check if NaN and return undefined if it is 
    // (don't return NaN as Object check is always NaN, check undefined for guard clause);
    if (isNaN(Number(mathObject.firstOperand)) || isNaN(Number(mathObject.secondOperand))) return undefined;
    return mathObject;
}

function checkOperator(mathObject) {
    const operatorOptions = ["+", "-", "*", "/"];
    if (!operatorOptions.some((item) => item === mathObject.operator)) return;
    return mathObject;
};

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
            mathObject.total = "0"
            console.log("Math error!");
    }

    return mathObject;
};

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