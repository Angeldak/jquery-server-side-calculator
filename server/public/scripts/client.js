/// <reference path="jquery.js" />
$(onReady);
const allowedOperators = ["+", "-", "*", "/"];
let currentDisplay = "";
let calcPower = false;

function onReady() {
    clickHandler();
    appendData();
    disableToggle(true);
}  // end onReady

// Set up click handlers
function clickHandler() {
    $("button").on("click", displayUpdate);
    $("#calcHistory").on("click", "tr", callHistory);
}  // end clickHandler

// Begin function to append calculation history
function appendData() {
    $.ajax(getRequest("math"))
        .then((req, res) => {
            $("#calcHistory").empty();
            for (const item of req) {
                $("#calcHistory").append(`
                    <tr>
                        <td>${item.firstOperand}</td>
                        <td>${item.operator}</td>
                        <td>${item.secondOperand}</td>
                        <td>=</td>
                        <td>${item.total}</td>
                    </tr>
                `)
            }
            let lastTotal = $("#calcHistory").children().last().children().last().text();
            $("#displayCalc").attr("placeholder", lastTotal);
        })
        .catch(checkError)
}  // end appendData

// Begin function to re-display prior calculation
function callHistory(event) {
    let totalText = $(event.target).parent().children().last().text();
    return $("#displayCalc").attr("placeholder", totalText);
}  // end callHistory

// Begin function to handle errors
function checkError(error) {
    console.log("Caught an error!");
    console.log(error.reponseText);
}  // end checkError

// Begin function to check if an operator has already been used
function checkOperator(keyStroke, currentArray) {
    for (const operator of allowedOperators) {
        if (currentArray.includes(operator)) return currentArray;
    }
    currentArray = currentArray + keyStroke;
    return currentArray;
}  // end checkOperator

// Begin function to collect data for POST request
function collectData() {
    const tempObj = { mathInfo: `${$("#displayCalc").val()}` };
    return tempObj;
}  // end collectData

// Begin function to handle key presses
function displayUpdate(event) {
    const tar = $(event.target);
    const keyType = tar.data("key-type");
    const keyValue = tar.data("key-value");

    if (keyType === "power") {
        if (calcPower === false) {
            $("#calcBody").toggleClass("addHover");
            $("#displayCalc").attr("placeholder", "0");
            disableToggle(false);
            calcPower = true;
        } else {
            $("#calcBody").toggleClass("addHover");
            $("#displayCalc").removeAttr('placeholder');
            disableToggle(true);
            calcPower = false;
            currentDisplay = "";
            $.ajax(deleteRequest("math"))
                .then(appendData)
                .catch(checkError);
        }
    }
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
            if (findOperandsOperator(currentDisplay)[2]) {
                currentDisplay = `${findOperandsOperator(currentDisplay)[0]}${findOperandsOperator(currentDisplay)[2]}`;
            } else {
                currentDisplay = "";
                $("#displayCalc").attr("placeholder", "0");
            }
        }
        if (keyValue === "AC") {
            currentDisplay = "";
            $("#displayCalc").attr("placeholder", "0");
        }
        if (keyValue === "=") {
            if (findOperandsOperator(currentDisplay).includes("")) return;
            $.ajax(postRequest("math", collectData()))
                .then(appendData)
                .catch(checkError);
            currentDisplay = "";
        }
    }
    $("#displayCalc").val(currentDisplay);
}  // displayUpdate


// Begin function to disable and re-enable buttons
function disableToggle(boolean) {
    for (const button of $("button")) {
        if ($(button).data("key-type") !== "power") {
            $(button).prop('disabled', boolean);
        }
    }
}  // end disableToggle

// Begin function to split string into operands and operator
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
}  // end findOperandsOperator

// Begin section of server requests
// Begin function for GET Request
function getRequest(path) {
    const tempObj = {
        method: "GET",
        url: `/${path}`
    }
    return tempObj;
}  // end getRequest

// Begin function for POST request
function postRequest(path, obj) {
    const tempObj = {
        method: "POST",
        url: `/${path}`,
        data: obj
    }
    return tempObj;
}  // end postRequest

// Begin function for DELETE request
function deleteRequest(path) {
    const tempObj = {
        method: "DELETE",
        url: `/${path}`
    }
    return tempObj;
}  // end deleteRequest