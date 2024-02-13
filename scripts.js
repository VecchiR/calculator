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
                    if (num1 === "0") {
                        if (this.textContent === "0") { break; }
                        if (this.textContent === ".") { num1 = `0${this.textContent}`; }
                        else {
                            num1 = this.textContent;
                        }
                    }

                    else { num1 += this.textContent; }
                    display.textContent = num1;
                    break;

                case (digitFlag === 'overwrite num2'):
                    if (this.textContent === ".") { num2 = `0${this.textContent}`; }
                    else { num2 = this.textContent; }
                    display.textContent = num2;
                    break;

                case (digitFlag === 'increase num2'):
                    if (this.textContent === "." && checkPoint(num2)) { break; }
                    if (num2 === "0") {
                        if (this.textContent === "0") { break; }
                        if (this.textContent === ".") { num2 = `0${this.textContent}`; }
                        else {
                            num2 = this.textContent;
                        }
                    }
                    else { num2 += this.textContent; }
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
                    result = "ERROR!";
                    roundedResult = result;
                }


                else {
                    result = result.toString();
                    roundResult();
                    removeDecimalZeros();
                }

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
                roundedResult = result;
            }

            else {
                result = result.toString();
                roundResult();
                removeDecimalZeros();
            }

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
        case (freshFlag || num1 === ''):
            return ('overwrite num1');

        case (!operator):
            if ((num1.length < 9 && !checkPoint(num1)) || (num1.length < 10 && checkPoint(num1))) {
                return ('increase num1');
            }

            else {
                return ('discard1');
            }

        case (num2 === ''):
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

    // OU 9 casas SEM ponto decimal, OU 10 casas DESDE QUE o ponto decimal NÃO esteja na última casa
    if ((result.length <= 9 && !checkPoint(result)) || (result.length <= 10 && checkPoint(result) && (result.indexOf('.') != result.length - 1))) {
        roundedResult = result;
        return;
    }


    else {
        let sign = Math.sign(parseFloat(result));
        let signSlotIfNegative = ((1-(sign))/2); // 0 if positive, 1 if negative 
        let trunc = Math.abs(Math.trunc(parseInt(result))).toString();
        let decimal = '';
        let availableLength = 0;
        roundedResult = '';

        if (result.includes('.')) {
            decimal = `${result.substring(result.indexOf('.') + 1)}`;
        }
        if (decimal.includes('e')) {
            decimal = `${decimal.substring(0, decimal.indexOf('e'))}`;
        }

        // a partir desse numero, já vem em notação exponencial. Só precisa fazer respeitar os 9 dígitos
        if (Math.abs(parseFloat(result)) >= 999999999999999934464) {

            let eFactor = Math.abs(result.substring(result.indexOf('e') + 1));
            let eString = result.substring(result.indexOf('e'));


            availableLength = 9 - trunc.length - eString.length - signSlotIfNegative; 

            if (decimal.length > availableLength && availableLength > 0) {
                decimal = decimal.substring(0, availableLength + 1);


                if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) === 9) {

                    decimal = decimal.substring(0, decimal.length - 1);

                    while (parseInt(decimal.at(-1)) === 9) {
                        decimal = decimal.substring(0, decimal.length - 1);
                    }

                    if (decimal) {
                        decimal = decimal.slice(0, -1) + (parseInt(decimal.at(-1)) + 1);

                        if (sign < 0) {roundedResult = '-';}
                        roundedResult = roundedResult + trunc + '.' + decimal + eString;
                        return;
                    }

                    else {
                        trunc = (parseInt(trunc) + 1).toString();

                        if (trunc.length > 1) {
                            trunc = '1';
                            eFactor++;
                            eString = `e+${eFactor}`;
                        }

                        if (sign < 0) {roundedResult = '-';}
                        roundedResult = roundResult + trunc + eString;
                        
                        return;
                    }

                }


                else if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) != 9) {
                    decimal = decimal.slice(0, -2) + (parseInt(decimal.at(-2)) + 1);
                }

                else { decimal = decimal.substring(0, availableLength); }

                if (sign < 0) {roundedResult = '-';}
                roundedResult = `${roundedResult}${trunc}.${decimal}${eString}`;
                return;
            }
            else {
                // if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }
                // roundedResult = trunc + eString;
                if (sign < 0) {roundedResult = '-';}
                roundedResult = `${roundedResult}${trunc}.${decimal}${eString}`;
                return;
            }
        }


        //a partir daqui, arredonda para 1e9 e precisa começar a usar o exponencial. Mas tem que ser MENOR que o ponto
        //em que o JS começa a colocar a forma exponencial por si só
        if (Math.abs(parseFloat(result)) >= 999999999.5 && Math.abs(parseFloat(result)) < 999999999999999934464) {

            if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }

            let e = 10 ** (trunc.length - 1);
            let truncByE = `${(parseInt(trunc) / e)}`;
            let eString = `e+${trunc.length - 1}`;
            let truncByEInteger = Math.trunc(truncByE).toString();
            let truncByEDecimal = '';
            if (truncByE.includes('.')) {
                truncByEDecimal = `${truncByE.substring(truncByE.indexOf('.') + 1)}`;
            }


            availableLength = 9 - (eString.length) - (truncByEInteger.length) - signSlotIfNegative;  

            if (truncByEDecimal.length > availableLength && availableLength > 0) {
                truncByEDecimal = truncByEDecimal.substring(0, availableLength + 1);

                if (parseInt(truncByEDecimal.at(-1)) >= 5 && parseInt(truncByEDecimal.at(-2)) === 9) {

                    truncByEDecimal = truncByEDecimal.substring(0, truncByEDecimal.length - 1);

                    while (parseInt(truncByEDecimal.at(-1)) === 9) {
                        truncByEDecimal = truncByEDecimal.substring(0, truncByEDecimal.length - 1);
                    }

                    if (truncByEDecimal) {
                        truncByEDecimal = truncByEDecimal.slice(0, -1) + (parseInt(truncByEDecimal.at(-1)) + 1);
                        if (sign < 0) {roundedResult = '-';}
                        roundedResult = roundedResult + truncByEInteger + '.' + truncByEDecimal + eString;
                        return;
                    }

                    else {
                        truncByEInteger = (parseInt(truncByEInteger) + 1).toString();

                        if (truncByEInteger.length > 1) {
                            truncByEInteger = '1';

                            eString = `e+${(trunc.length - 1) + 1}`;
                        }

                        if (sign < 0) {roundedResult = '-';}
                        roundedResult = roundedResult + truncByEInteger + eString;
                        return;
                    }

                }


                else if (parseInt(truncByEDecimal.at(-1)) >= 5 && parseInt(truncByEDecimal.at(-2)) != 9) {
                    truncByEDecimal = truncByEDecimal.slice(0, -2) + (parseInt(truncByEDecimal.at(-2)) + 1);
                }

                else { truncByEDecimal = truncByEDecimal.substring(0, availableLength); }

                if (sign < 0) {roundedResult = '-';}
                roundedResult = `${roundedResult}${truncByEInteger}.${truncByEDecimal}${eString}`;
                return;
            }
            else {
                if (sign < 0) {roundedResult = '-';}
                roundedResult = roundedResult + truncByE + eString;
                return;
            }
        }

        //nessa faixa de valores, basta arredondar os decimais (se houver)
        if (Math.abs(parseFloat(result)) < 999999999.5 && Math.abs(parseFloat(result)) > 0.0000001) {

            availableLength = 9 - trunc.length - signSlotIfNegative; 

            if (decimal.length > availableLength && availableLength > 0) {
                decimal = decimal.substring(0, availableLength + 1);


                if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) === 9) {

                    decimal = decimal.substring(0, decimal.length - 1);

                    while (parseInt(decimal.at(-1)) === 9) {
                        decimal = decimal.substring(0, decimal.length - 1);
                    }

                    if (decimal) {
                        decimal = decimal.slice(0, -1) + (parseInt(decimal.at(-1)) + 1);
                        
                        if (sign < 0) {roundedResult = '-';}
                        roundedResult = roundedResult + trunc + '.' + decimal;
                        return;
                    }

                    else {
                        trunc = (parseInt(trunc) + 1).toString();
                        if (sign < 0) {roundedResult = '-';}
                        roundedResult = roundedResult + trunc;
                        return;
                    }

                }


                else if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) != 9) {
                    decimal = decimal.slice(0, -2) + (parseInt(decimal.at(-2)) + 1);
                }

                else { decimal = decimal.substring(0, availableLength); }

                if (sign < 0) {roundedResult = '-';}
                roundedResult = `${roundedResult}${trunc}.${decimal}`;
                return;
            }
            else {
                if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }
                if (sign < 0) {roundedResult = '-';}
                roundedResult = roundedResult + trunc;
                return;
            }

        }

        //abaixo desse valor, será necessário o uso de exponenciais negativos (mas o JS já escreve nessa notação a partir daqui!)
        if (Math.abs(parseFloat(result)) <= 0.0000001) {

            let eFactor = Math.abs(result.substring(result.indexOf('e') + 1));
            let eString = result.substring(result.indexOf('e'));

            availableLength = 9 - trunc.length - eString.length - signSlotIfNegative; 

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
                        return;
                    }

                    else {
                        trunc = (parseInt(trunc) + 1).toString();

                        if (trunc.length > 1) {
                            trunc = '1';

                            eFactor--;
                            eString = `e-${eFactor}`;
                        }

                        if (sign < 0) {roundedResult = '-';}
                        roundedResult = roundedResult + trunc + eString;
                        return;
                    }

                }


                else if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) != 9) {
                    decimal = decimal.slice(0, -2) + (parseInt(decimal.at(-2)) + 1);
                }

                else { decimal = decimal.substring(0, availableLength); }

                if (sign < 0) {roundedResult = '-';}
                roundedResult = `${roundedResult}${trunc}.${decimal}${eString}`;
                return;
            }
            else {
                // if (parseInt(decimal.at(0)) >= 5) { trunc = (parseInt(trunc) + 1).toString(); }
                // roundedResult = trunc + eString;
                if (sign < 0) {roundedResult = '-';}
                roundedResult = `${roundedResult}${trunc}.${decimal}${eString}`;
                return;
            }

        }

    }


}

function removeDecimalZeros() {
    if (!checkPoint(roundedResult)) { return; }

    else {
        let sign = Math.sign(parseFloat(result));
        let trunc = Math.abs(Math.trunc(parseInt(roundedResult))).toString();
        let decimal = `${roundedResult.substring(roundedResult.indexOf('.') + 1)}`;
        let eString = '';
        if (decimal.includes('e')) {
            decimal = `${decimal.substring(0, decimal.indexOf('e'))}`;
            eString = roundedResult.substring(roundedResult.indexOf('e'));
        }

        while (parseInt(decimal.at(-1)) === 0) {
            decimal = decimal.substring(0, decimal.length - 1);
        }

        roundedResult = '';

        if (decimal) {
            if (sign < 0) {roundedResult = '-';}
            roundedResult = roundedResult + trunc + '.' + decimal + eString;
            return;
        }

        else {
            if (sign < 0) {roundedResult = '-';}
            roundedResult = roundedResult + trunc + eString;
            return;
        }


    }

}



