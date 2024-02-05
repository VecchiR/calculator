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


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            document.querySelector(`#n${e.key}`).click();
            break;
        
        case '/':
            document.querySelector('#divide').click();
            break;
        case '*':
            document.querySelector('#multiply').click();
            break;
        case '-':
            document.querySelector('#minus').click();
            break;
        case '+':
            document.querySelector('#plus').click();
            break;
    }
    
    switch (e.code) {
        case 'Comma': 
        case 'Period':
        case 'NumpadDecimal':
            document.querySelector('#period').click();
            break;

        case 'Enter':
        case 'Equal':
        case 'NumpadEnter':
            document.querySelector('.equal').click();
            break;

        case 'Backspace':
        case 'Delete':
            document.querySelector('.backspace').click();
            break;

        case 'Space':
        case 'Escape':
            document.querySelector('.clear').click();
            break;
        
    }
}, {});



function buttonClick() {

    switch (this.className) {

        case "digit":
            digitFlag = setDigitFlag();
            switch (true) {
                case (digitFlag === 'overwrite num1'):
                    if (this.textContent === ".") {num1 = `0${this.textContent}`;}
                    else {num1 = this.textContent;}
                    display.textContent = num1;
                    freshFlag = false;
                    break;

                case (digitFlag === 'increase num1'):
                    if (this.textContent === "." && checkPoint(num1)) {break;}
                    num1 += this.textContent;
                    display.textContent = num1;
                    break;

                case (digitFlag === 'overwrite num2'):
                    if (this.textContent === ".") {num2 = `0${this.textContent}`;}
                    else {num2 = this.textContent;}
                    display.textContent = num2;
                    break;

                case (digitFlag === 'increase num2'):
                    if (this.textContent === "." && checkPoint(num2)) {break;}
                    num2 += this.textContent;
                    display.textContent = num2;
                    break;

                case (digitFlag === 'discard1' || digitFlag === 'discard2'):
                    break;
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
                    result = "ERROR!";}
                
                roundResult();
                
                // num1 = result; --> nao precisa mais, agora já existe o "REFRESHKEEPRESULT()"
                
                display.textContent = roundedResult;
                
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

            roundResult();

            display.textContent = roundedResult;

            refreshKeepResult();
            
            resetOperator = true;
            
            break;

        case "clear":
            digitFlag = "";
            freshFlag = true;
            display.textContent = '';
            num1 = '';
            num2 = '';
            operator = '';
            result = '';
            roundedResult = '';
            break;

        case "backspace":
            digitFlag = setDigitFlag();
            switch (true) {
                case (digitFlag === 'overwrite num1'):
                case (digitFlag === 'increase num1'):
                case (digitFlag === 'discard1'):
                    num1 = num1.substring(0, num1.length - 1);
                    display.textContent = num1;
                    break;
                
                case (digitFlag === 'overwrite num2'):
                case (digitFlag === 'increase num2'):
                case (digitFlag === 'discard2'):
                    num2 = num2.substring(0, num2.length - 1);
                    display.textContent = num2;
                    break;

            break;
            }
    }

}


function checkPoint(n) {
    let pointPosition = n.search(/\./);
    if (pointPosition >= 0) {
        return true;}
    return false;
}

function roundResult() {
    roundedResult = result;
    if (result.toString().length <= 9) {
        return;
    }
    else {
        let trunc = Math.trunc(result);
        
        if (trunc.toString().length > 9) {
            // let parte = 
            // let append  
            return;
        }


    }
}

function refreshKeepResult() {
    num1 = result.toString();
    num2 = '';
    result = '';
    digitFlag = '';
    roundedResult = '';
    if (resetOperator) { operator = ''; }
}

function setDigitFlag() {

    switch (true) {
        case (freshFlag || num1 === '0' || num1 === ''):
            return('overwrite num1');

        case (!operator):
            if (num1.length < 9) {
                return('increase num1');
            }

            else {
                return('discard1');
            }

        case (num2 === '0' || num2 === ''):
            return ('overwrite num2');

        default:
            if (num2.length < 9) {
                return ('increase num2');
            }
            else {
                return ('discard2');
            }
    }

}

let operator = '';
let result = '';
let roundedResult = '';
let num1 = '';
let num2 = '';
let freshFlag = true;
let resetOperator = true;
let digitFlag = '';
