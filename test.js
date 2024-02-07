let eFactor = 9;
let eString = `e-${eFactor}`;
let trunc = '9';
let decimal = '00000000001';
let rounded = '';

let availableLength = 9 - trunc.length - eString.length;
console.log('available length:', availableLength);

if (decimal.length > availableLength && availableLength > 0) {
  decimal = decimal.substring(0, availableLength + 1);

  console.log('i was', decimal);




  if (parseInt(decimal.at(-1)) >= 5 && parseInt(decimal.at(-2)) === 9) {

    decimal = decimal.substring(0, decimal.length - 1);
    console.log('now i am', decimal);

    while (parseInt(decimal.at(-1)) === 9) {
      decimal = decimal.substring(0, decimal.length - 1);
      console.log('now i am', decimal);
    }

    if (decimal) {
      decimal = decimal.slice(0, -1) + (parseInt(decimal.at(-1)) + 1);
      rounded = trunc + '.' + decimal + eString;
    }

    else {
      trunc = (parseInt(trunc) + 1).toString();

      if (trunc.length > 1) {
        trunc = "1";
        eFactor--;
        eString = `e-${eFactor}`;
      }

      rounded = trunc + eString;
    }
  }
}


console.log(rounded);