function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}


function operate(n1, operator, n2) {
    switch (operator) {
        case "+":
            return add(n1, n2);

        case "-":
            return subtract(n1, n2);

        case "*":
            return multiply(n1, n2);

        case "/":
            return divide(n1, n2);

    }
}

const display = document.querySelector('.display');
const allButtons = document.querySelectorAll('button');
allButtons.forEach(function (button) {
    button.addEventListener('click', buttonClick);
});

function buttonClick() {
    switch (this.className) {
        case "digit":
            if (!operator) {
                num1 += this.textContent;
                display.textContent = num1;
            } else {
                num2 += this.textContent;
                display.textContent = num2;
            }
            break;
        case "operator":
            if (operator) {
                result = operate(num1, operator, num2);
                num1 = result;
                display.textContent = result;
                refreshKeepResult();
            }
            operator = this.textContent;
            break;
        case "equal":
            result = operate(num1, operator, num2);
            display.textContent = result;
            refreshKeepResult();
            break;
        case "clear":
            display.textContent = '';
            num1 = '';
            num2 = '';
            operator = '';
            result = '';
            break;
    }

}

function refreshKeepResult() {
    num1 = result;
    num2 = '';
    operator = '';
    result = '';
}

let operator = '';
let result = '';
let num1 = '';
let num2 = '';