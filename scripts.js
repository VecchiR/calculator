let operator = '';
let result = '';
let roundedResult = '';
let num1 = '';
let num2 = '';
let freshFlag = true;
let resetOperator = true;
let digitFlag = '';

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


function buttonClick() {

    switch (this.className) {

        case "digit":
            digitFlag = setDigitFlag();
            switch (true) {
                case (digitFlag === 'overwrite num1'):
                    if (this.textContent === ".") { num1 = `0${this.textContent}`; }
                    else { num1 = this.textContent; }
                    display.textContent = num1;
                    freshFlag = false;
                    break;

                case (digitFlag === 'increase num1'):
                    if (this.textContent === "." && checkPoint(num1)) { break; }
                    num1 += this.textContent;
                    display.textContent = num1;
                    break;

                case (digitFlag === 'overwrite num2'):
                    if (this.textContent === ".") { num2 = `0${this.textContent}`; }
                    else { num2 = this.textContent; }
                    display.textContent = num2;
                    break;

                case (digitFlag === 'increase num2'):
                    if (this.textContent === "." && checkPoint(num2)) { break; }
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

                result = operate(num1, operator, num2).toString();

                if (result === Infinity || isNaN(result)) {
                    result = "ERROR!";
                }

                roundResult();

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

            result = operate(num1, operator, num2).toString();

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
                    num1 = '0';
                    display.textContent = num1;
                    break;
                case (digitFlag === 'increase num1'):
                case (digitFlag === 'discard1'):
                    num1 = num1.substring(0, num1.length - 1);
                    if (num1 === '') { num1 = '0'; }
                    display.textContent = num1;
                    break;

                case (digitFlag === 'overwrite num2'):
                    num2 = '0';
                    display.textContent = num2;
                    break;
                case (digitFlag === 'increase num2'):
                case (digitFlag === 'discard2'):
                    num2 = num2.substring(0, num2.length - 1);
                    if (num2 === '') { num2 = '0'; }
                    display.textContent = num2;
                    break;
            }
    }

}


function checkPoint(n) {
    let pointPosition = n.search(/\./);
    if (pointPosition >= 0) {
        return true;
    }
    return false;
}

function refreshKeepResult() {
    num1 = result;
    num2 = '';
    result = '';
    digitFlag = '';
    roundedResult = '';
    if (resetOperator) { operator = ''; }
}

function setDigitFlag() {

    switch (true) {
        case (freshFlag || num1 === '0' || num1 === ''):
            return ('overwrite num1');

        case (!operator):
            if ((num1.length < 9 && !checkPoint(num1)) || (num1.length < 10 && checkPoint(num1))) {
                return ('increase num1');
            }

            else {
                return ('discard1');
            }

        case (num2 === '0' || num2 === ''):
            return ('overwrite num2');

        default:
            if ((num2.length < 9 && !checkPoint(num2)) || (num2.length < 10 && checkPoint(num2))) {
                return ('increase num2');
            }
            else {
                return ('discard2');
            }
    }

}

function roundResult() {

    // "If number is longer than 21 digit, JS uses exponential notation.  (999999999999999934464)
    // JS also uses exponential notation if number starts with “0.” followed by more than five zeros."


    // OU 9 casas SEM ponto decimal, OU 10 casas DESDE QUE o ponto decimal NÃO esteja na última casa
    if ((result.length <= 9 && !checkPoint(result)) || (result.length <= 10 && checkPoint(result) && (result.indexOf('.') != result.length - 1))) {
        roundedResult = result;
        return;
    }


    else {
        let trunc = Math.trunc(parseInt(result)).toString();
        let decimal = '';
        let availableLength = 0;

        if (result.includes('.')) {
            decimal = `${result.substring(result.indexOf('.') + 1)}`;
        }
        if (decimal.includes('e')) {
            decimal = `${decimal.substring(0, decimal.indexOf('e'))}`;
        }

        // a partir desse numero, já vem em notação exponencial. Só precisa fazer respeitar os 9 dígitos
        if (parseFloat(result) >= 999999999999999934464) {

            let eString = result.substring(result.indexOf('e'));

            availableLength = 9 - trunc.length - eString.length;

            if (decimal.length > availableLength && availableLength > 0) {
                decimal = decimal.substring(0, availableLength + 1);
                if (parseInt(decimal.at(-1)) >= 5) {
                    decimal = decimal.slice(0, -2) + (parseInt(decimal.at(-2)) + 1);
                }
                else { decimal = decimal.substring(0, availableLength); }
                roundedResult = `${trunc}.${decimal}${eString}`;
                return;
            }
            else {
                if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }
                roundedResult = trunc + eString;
                return;
            }


        }


        //a partir daqui, arredonda para 1e9 e precisa começar a usar o exponencial. Mas tem que ser MENOR que o ponto
        //em que o JS começa a colocar a forma exponencial por si só
        if (parseFloat(result) >= 999999999.5 && parseFloat(result) < 999999999999999934464) {

            if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }

            let e = 10 ** (trunc.length - 1);
            let truncByE = `${(parseInt(trunc) / e)}`;
            let eString = `e+${trunc.length - 1}`;
            let truncByEInteger = Math.trunc(truncByE).toString();
            let truncByEDecimal = '';
            if (truncByE.includes('.')) {
                truncByEDecimal = `${truncByE.substring(truncByE.indexOf('.') + 1)}`;
            }


            availableLength = 9 - (eString.length) - (truncByEInteger.length);

            if (truncByEDecimal.length > availableLength && availableLength > 0) {
                truncByEDecimal = truncByEDecimal.substring(0, availableLength + 1);
                if (parseInt(truncByEDecimal.at(-1)) >= 5) {
                    truncByEDecimal = truncByEDecimal.slice(0, -2) + (parseInt(truncByEDecimal.at(-2)) + 1);
                }
                else { truncByEDecimal = truncByEDecimal.substring(0, availableLength); }

                roundedResult = `${truncByEInteger}.${truncByEDecimal}${eString}`;
                return;
            }

            roundedResult = truncByE + eString;
            return;
        }

        //nessa faixa de valores, basta arredondar os decimais (se houver)
        if (parseFloat(result) < 999999999.5 && parseFloat(result) > 0.0000001) {

            availableLength = 9 - trunc.length;

            if (decimal.length > availableLength && availableLength > 0) {
                decimal = decimal.substring(0, availableLength + 1);
                if (parseInt(decimal.at(-1)) >= 5) {
                    decimal = decimal.slice(0, -2) + (parseInt(decimal.at(-2)) + 1);
                }
                else { decimal = decimal.substring(0, availableLength); }
                roundedResult = `${trunc}.${decimal}`;
                return;
            }
            else {
                if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }
                roundedResult = trunc;
                return;
            }


        }

        //abaixo desse valor, será necessário o uso de exponenciais negativos
        if (parseFloat(result) <= 0.0000001) {

            let eFactor = Math.abs(result.substring(result.indexOf('e') + 1));
            let eString = result.substring(result.indexOf('e'));

            availableLength = 9 - trunc.length - eString.length;

            if (decimal.length > availableLength && availableLength > 0) {
                decimal = decimal.substring(0, availableLength + 1);


                if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) === 9) {

                    decimal = decimal.substring(0, decimal.length - 1);

                    while (parseInt(decimal.at(-1)) === 9) {
                        decimal = decimal.substring(0, decimal.length - 1);
                    }

                    if (decimal) {
                        decimal = decimal.slice(0, -1) + (parseInt(decimal.at(-1)) + 1);
                        roundedResult = trunc + '.' + decimal + eString;
                    }

                    else {
                        trunc = (parseInt(trunc) + 1).toString();

                        if (trunc.length > 1) {
                            trunc = "1";
                            eFactor--;
                            eString = `e-${eFactor}`;
                        }

                        roundedResult = trunc + eString;
                    }

                }


                else if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) != 9) {
                    decimal = decimal.slice(0, -2) + (parseInt(decimal.at(-2)) + 1);
                }

                else { decimal = decimal.substring(0, availableLength); }

                roundedResult = `${trunc}.${decimal}${eString}`;
                return;
            }
            else {
                if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }
                roundedResult = trunc + eString;
                return;
            }

            // let zeroCount = result.match(/(\.0*)/)[0].length - 1;
            // let e = 10 ** -(zeroCount+1);
            // let eString = `e-${zeroCount+1}`;
            // let noPointByE = (parseFloat(decimal) * e).toString() ;
            // let noPointByETrunc = Math.trunc(noPointByE).toString();
            // let noPointByEDecimal = '';
            // if (noPointByE.includes('.')) {
            //     noPointByEDecimal = `${noPointByE.substring(noPointByE.indexOf('.') + 1)}`;
            // }

            // availableLength = 8 - (eString.length) - (noPointByETrunc.length);
            // // if (checkPoint(noPointByE)) { availableLength++;}

            // if (noPointByEDecimal.length > availableLength && availableLength > 0) {
            //     noPointByEDecimal = noPointByEDecimal.substring(0, availableLength + 1);
            //     if (parseInt(noPointByEDecimal.at(-1)) >= 5) {
            //         noPointByEDecimal = noPointByEDecimal.slice(0, -2) + (parseInt(noPointByEDecimal.at(-2)) + 1);
            //     }
            //     else { noPointByEDecimal = noPointByEDecimal.substring(0, availableLength); }

            //     roundedResult = `${noPointByETrunc}.${noPointByEDecimal}${eString}`;
            //     return;
            // }

            // roundedResult = noPointByE + eString;
            // return;

        }

    }
}

