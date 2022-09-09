$(onReady);
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

function postRequest(path, data) {

}