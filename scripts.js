function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


function test(n1, operator, n2) {
    switch (operator) {
        case "+":
            console.log(add(n1, n2));
            break;
        case "-":
            console.log(subtract(n1, n2));
            break;
        case "*":
            console.log(multiply(n1, n2));
            break;
        case "/":
            console.log(divide(n1, n2));
            break;
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

function buttonClick () {
    console.log(this.textContent);
    display.textContent = this.textContent;

}


let num1;
let num2;
let operator;

// test(2,"+",0);
// test(2,"-",0);
// test(2,"*",0);
// test(2,"/",0);