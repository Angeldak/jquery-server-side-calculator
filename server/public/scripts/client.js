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
    console.log("Caught an error!");
    console.log(error.reponseText);
}

function checkOperator(keyStroke, currentArray) {
    for (const operator of allowedOperators) {
        if (currentArray.includes(operator)) return currentArray;
    }
    currentArray = currentArray + keyStroke;
    return currentArray;
}

function collectData() {
    const tempArray = $("#displayCalc").val(currentDisplay);
    return tempArray.split("");
}

function displayUpdate(event) {
    const tar = $(event.target);
    const keyType = tar.data("key-type");
    const keyValue = tar.data("key-value");

    if (keyType === "number") {
        currentDisplay = currentDisplay + keyValue;
    }
    if (keyType === "operator") {
        currentDisplay = checkOperator(keyValue, currentDisplay);
    }
    if (keyType === "dot") {
        if (findOperandsOperator(currentDisplay)[2]) {
            if (!findOperandsOperator(currentDisplay)[1].includes(".")) {
                currentDisplay = currentDisplay + keyValue;
            }
        } else {
            if (!findOperandsOperator(currentDisplay)[0].includes(".")) {
                currentDisplay = currentDisplay + keyValue;
            }
        }
    }
    if (keyType === "misc") {
        if (keyValue === "C") {
            currentDisplay = `${findOperandsOperator(currentDisplay)[0]}${findOperandsOperator(currentDisplay)[2]}`;
        }
        if (keyValue === "AC") {
            currentDisplay = "";
        }
    }
    $("#displayCalc").val(currentDisplay);
}

function findOperandsOperator(array) {
    let tempArray = array.split("");
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

function getRequest(path) {
    const tempObj = {
        method: "GET",
        url: `/${path}`
    }
    return tempObj;
}

function postRequest(path, data) {
    const tempObj = {
        method: "GET",
        url: `/${path}`,
        data: `${data}`
    }
    return tempObj;
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