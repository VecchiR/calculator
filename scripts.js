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
            flag = setFlag();
            if (freshFlag || num1 === "0") {
                num1 = this.textContent;
                display.textContent = num1;
                freshFlag = false;
            } else if (!operator && !freshFlag && num1.length < 9) {
                num1 += this.textContent;
                display.textContent = num1;
            }
            else {
                if (num2 === "0") {
                    num2 = this.textContent;
                }
                else if (num2.length < 9) {
                    num2 += this.textContent;
                }
                display.textContent = num2;
            }
            break;
        case "operator":
            freshFlag = false;
            if (!num1) {
                num1 = "0";
            }
            if (operator && num2) {
                result = operate(num1, operator, num2);
                if (result === Infinity || isNaN(result)) {
                    result = "ERROR!";
                }
                num1 = result;
                display.textContent = result;
                refreshKeepResult();
            }
            operator = this.textContent;
            break;
        case "equal":
            freshFlag = true;
            if (operator && !num2) {
                num2 = num1;
                resetOperator = false;
            }
            else if (!operator || !num1 || !num2) {
                break;
            }
            result = operate(num1, operator, num2);
            if (result === Infinity || isNaN(result)) {
                result = "ERROR!";
            }
            display.textContent = result;
            refreshKeepResult();
            resetOperator = true;
            break;
        case "clear":
            onflag = true;
            freshFlag = true;
            display.textContent = '';
            num1 = '';
            num2 = '';
            operator = '';
            result = '';
            break;
    }

}

function refreshKeepResult() {
    num1 = result.toString();
    num2 = '';
    result = '';
    onflag = true;
    if (resetOperator) { operator = ''; }
}

function setFlag() {
    
    //is it fresh OU is num1 = 0?
        // num1 override

    // operator VAZIO?
        //num1 tem MENOS que 9 dígitos?
            // num1 += display
        // discard digit

    //  o num2 é 0?
        // num2 override
    
    // nada disso
        //num2 tem MENOS que 9 dígitos?
            // num2 += display
        // discard digit
}

let operator = '';
let result = '';
let num1 = '';
let num2 = '';
let freshFlag = true;
let resetOperator = true;
let onflag = true; //true if inputting num1, false if num2