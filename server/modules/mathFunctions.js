module.exports = {
    checkNumbers: checkNumbers
}

function checkNumbers(mathObject) {
    mathObject.firstOperand = Number(mathObject.firstOperand);
    mathObject.secondOperand = Number(mathObject.secondOperand);
    if (isNaN(Number(mathObject.firstOperand)) || isNaN(Number(mathObject.secondOperand))) return undefined;
    return mathObject;
}