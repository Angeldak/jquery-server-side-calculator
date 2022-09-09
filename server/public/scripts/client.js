$(onReady);
const allowedOperators = ["+", "-", "*", "/"];
let currentDisplay = "";

function onReady() {
    clickHandler();
}

function clickHandler() {
    $("button").on("click", displayUpdate);
}

function appendData() {

}

function checkError(error) {

}

function checkOperator(keyStroke) {

}

function collectData() {

}

function displayUpdate(event) {
    currentDisplay = currentDisplay + $(event.target).data("calcinfo");
    $("#displayCalc").val(currentDisplay);
}

function getRequest(path) {

}

function mathArrayToObject(array) {
    let operandToggle = true;
    const newObject = {
        firstOperand: "",
        secondOperand: "",
        operator: ""
    };
    let newData = array.map((item) => item);
    for (const info of newData) {
        if (!isNaN(Number(info)) && operandToggle === true) {
            console.log(newObject.firstOperand, info);
            newObject.firstOperand += info;
        } else if (allowedOperators.includes(info) && operandToggle === true) {
            newObject.operator = info;
            operandToggle = false;
        } else if (allowedOperators.includes(info)) {
            switch (newObject.operator) {
                case "+":
                    newObject.firstOperand = (Number(newObject.firstOperand) + Number(newObject.secondOperand)).toString();
                    break;
                case "-":
                    newObject.firstOperand = (Number(newObject.firstOperand) - Number(newObject.secondOperand)).toString();
                    break;
                case "*":
                    newObject.firstOperand = (Number(newObject.firstOperand) * Number(newObject.secondOperand)).toString();
                    break;
                case "/":
                    newObject.firstOperand = (Number(newObject.firstOperand) / Number(newObject.secondOperand)).toString();
                    break;
                default:
                    console.log("Error not an operator!");
            }
            newObject.operator = info;
            newObject.secondOperand = "";
        } else {
            newObject.secondOperand += info;
        }
    }
    return newObject;
}

function postRequest(path, data) {

}