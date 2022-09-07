let storedValue = 0;
let storedOperation = "";
let screen = document.querySelector("#screen");
let resetScreen = false;

function attachClickEvent(button) {
    let classes = button.classList.toString();
    let buttonType = classes.replace("button ", "");
    switch(buttonType) {
        case "add":
            button.addEventListener('click', () => operate('+'));
            break;
        case "subtract":
            button.addEventListener('click', () => operate('-'));
            break;
        case "multiply":
            button.addEventListener('click', () => operate('*'));
            break;
        case "divide":
            button.addEventListener('click', () => operate('/'));
            break;
        case "equals":
            button.addEventListener('click', () => operate('='));
            break;
        case "clear":
            button.addEventListener('click', clear);
            break;
        case "delete":
            button.addEventListener('click', backspace);
            break;
        case "square-root":
            button.addEventListener('click', squareRoot);
            break;
        case "decimal":
            button.addEventListener('click', decimal);
            break;
        case "sign":
            button.addEventListener('click', toggleSign);
            break;
        default:
            button.addEventListener('click', () => {
                includeNumber(button.innerText)});
            break;
    }
}

function operate(newOperator) {
    evaluate();
    storedValue = (newOperator == "=") ? "" : screen.innerText;
    resetScreen = true;
    storedOperation = newOperator;
}

function includeNumber(num) {
    if (resetScreen) {
        screen.innerText = "";
        resetScreen = false;
    }
    screen.innerText += num;
}

function evaluate() {
    switch(storedOperation) {
        case "+":
            screen.innerText = truncate(+storedValue + +screen.innerText);
            break;
        case "-":
            screen.innerText = truncate(+storedValue - +screen.innerText);
            break;
        case "*":
            screen.innerText = truncate(+storedValue * +screen.innerText);
            break;
        case "/":
            screen.innerText = truncate(+storedValue / +screen.innerText);
            break;
        default:
            break;
    }
}

function backspace() {
    if (screen.innerText != "") {
        screen.innerText = screen.innerText.slice(0, screen.innerText.length-1);
    }
    if (screen.innerText == "-") {
        screen.innerText = "";
    }
}

function clear() {
    screen.innerText = "";
    storedValue = 0;
    resetScreen = false;
    storedOperation = "";
}

function squareRoot() {
    if (screen.innerText != "") {
        if (screen.innerText < 0) {
            alert("STOP DOING BAD THINGS");
        }
        else {
            screen.innerText = truncate(Math.sqrt(screen.innerText));
        }
    }
}

function decimal() {
    if (screen.innerText.includes(".")) {
        alert("Can't have more than one decimal place");
    }
    else {
        screen.innerText += ".";
    }
}

function toggleSign() {
    if (screen.innerText != "") {
        if (screen.innerText.includes("-")) {
            screen.innerText = screen.innerText.replace("-", "");
        }
        else {
            screen.innerText = "-" + screen.innerText;
        }
    }
}

function truncate(num) {
    if ((num == Infinity) || (num == -Infinity)) {
        alert("STOP DOING BAD THINGS");
        return "";
    }
    let desiredDecimalPlaces = 5;
    let temp = num * Math.pow(10, desiredDecimalPlaces);
    return (Math.trunc(temp) / Math.pow(10, desiredDecimalPlaces));
}

function addKeyboardInput(e) {
    switch(e.key) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            operate(e.key);
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            includeNumber(e.key);
            break;
        case ".":
            decimal();
            break;
        case "c":
        case "C":
        case "a":
        case "A":
            clear();
            break;
        default:
            console.log(e.keyCode);
            if (e.keyCode == 13) { // Enter/Return
                operate('=');
            }
            else if (e.keyCode == 8) { // Delete
                backspace();
            }
            break;
    }
}

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => attachClickEvent(button));

document.body.addEventListener('keyup', addKeyboardInput);