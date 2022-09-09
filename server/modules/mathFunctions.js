module.exports = {
    checkNumbers,
    doMath
}

function checkNumbers(mathObject) {
    // Convert Operands to Numbers
    mathObject.firstOperand = Number(mathObject.firstOperand);
    mathObject.secondOperand = Number(mathObject.secondOperand);

    // Check if NaN and return undefined if it is 
    // (don't return NaN as Object check is always NaN, check undefined for guard clause);
    if (isNaN(Number(mathObject.firstOperand)) || isNaN(Number(mathObject.secondOperand))) return undefined;
    return mathObject;
}

function checkOperator(mathObject) {

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

