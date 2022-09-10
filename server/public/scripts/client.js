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
    const tar = $(event.target);
    if (tar.data("key-type") === "misc") return;
    if (tar.data("key-type") === "number") {
        currentDisplay = currentDisplay + tar.data("key-value");
    }
    if (tar.data("key-type") === "operator") {
        for (const operator of allowedOperators) {
            if (currentDisplay.includes(operator)) return;
        }
        currentDisplay = currentDisplay + tar.data("key-value");
    }
    if (tar.data("key-type") === "dot") {
        let tempArray = currentDisplay.split("");
        let operatorToggle = false;
        let firstOperand = "";
        let secondOperand = "";
        for (const item of tempArray) {
            if (allowedOperators.includes(item)) {
                operatorToggle = true;
                continue;
            }
            if (operatorToggle === false) {
                firstOperand += item;
                console.log(firstOperand);
            } else {
                secondOperand += item;
                console.log(secondOperand);
            }
        }
        if (operatorToggle === false) {
            if (!firstOperand.includes("."))
                currentDisplay = currentDisplay + tar.data("key-value");
        } else {
            if (!secondOperand.includes("."))
                currentDisplay = currentDisplay + tar.data("key-value");
        }
    }

    $("#displayCalc").val(currentDisplay);
}

function getRequest(path) {

}

function postRequest(path, data) {

}

// MOVE TO SERVER
// String Calc Reduction:
// function mathArrayToObject(array) {
//     let operandToggle = true;
//     const newObject = {
//         firstOperand: "",
//         secondOperand: "",
//         operator: ""
//     };
//     let newData = array.map((item) => item);
//     for (const info of newData) {
//         if (!isNaN(Number(info)) && operandToggle === true) {
//             console.log(newObject.firstOperand, info);
//             newObject.firstOperand += info;
//         } else if (allowedOperators.includes(info) && operandToggle === true) {
//             newObject.operator = info;
//             operandToggle = false;
//         } else if (allowedOperators.includes(info)) {
//             switch (newObject.operator) {
//                 case "+":
//                     newObject.firstOperand = (Number(newObject.firstOperand) + Number(newObject.secondOperand)).toString();
//                     break;
//                 case "-":
//                     newObject.firstOperand = (Number(newObject.firstOperand) - Number(newObject.secondOperand)).toString();
//                     break;
//                 case "*":
//                     newObject.firstOperand = (Number(newObject.firstOperand) * Number(newObject.secondOperand)).toString();
//                     break;
//                 case "/":
//                     newObject.firstOperand = (Number(newObject.firstOperand) / Number(newObject.secondOperand)).toString();
//                     break;
//                 default:
//                     console.log("Error not an operator!");
//             }
//             newObject.operator = info;
//             newObject.secondOperand = "";
//         } else {
//             newObject.secondOperand += info;
//         }
//     }
//     return newObject;
// }