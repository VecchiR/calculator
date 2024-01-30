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


// const allButtons = document.querySelectorAll('button');
// allButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         console.log(button.textContent);
//     });
// });

const display = document.querySelector('.display');
const allButtons = document.querySelectorAll('button');
allButtons.forEach(function (button) {
    button.addEventListener('click', buttonClick);
});

function buttonClick() {
    switch (this.className) {
        case "digit":
            numberInput += this.textContent;
            display.textContent = numberInput;
            break;
        case "operator":
            if(!operator){
            num2 = num1;
            }
            else {
            partial = operate(num1,operator,num2);
            num2 = partial;
            }
            num1 = numberInput;
            numberInput = '';
            operator = this.textContent;
            display.textContent = operator;
            break;
        case "equal":
            if (!num2 && numberInput) {
                num2 = numberInput;
            }
            result = operate(num1,operator,num2);
            display.textContent = result;
            break;
        case "clear":
            display.textContent = '';
            num1 = '';
            num2 = '';
            numberInput = '';
            operator = '';
            partial = '';
            result = '';
            break;
    }

}


let num1 = '';
let num2 = '';
let numberInput = '';
let operator = '';
let partial = '';
let result = '';

// operate(2,"+",0);
// operate(2,"-",0);
// operate(2,"*",0);
// operate(2,"/",0);