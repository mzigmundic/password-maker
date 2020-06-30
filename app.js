// Get elements
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const lowercaseElement = document.getElementById('lowercase');
const uppercaseElement = document.getElementById('uppercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const createElement = document.getElementById('create');

// Object with functions for random chars
const randomFunctions = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Main function
function createPassword(lower, upper, number, symbol, length) {
    
    // ex: 1 + 1 + 1 + 0
    const typesCount = lower + upper + number + symbol;
    // ex: [{lower: true}, {upper: true}, {number: true}, {symbol: flase}] -> filter out false-s
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// If no type has been selected return empty string
	if (typesCount === 0) {
		return '';
    }

    /* Checking if each type has aproximately same chance for showing up - it does
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    const stat = 10000;
    for (let i = 0; i < stat; i++) {
        let randomType = typesArr[Math.floor(Math.random() * typesCount)];
        let randomF = Object.keys(randomType)[0];
        if (randomF === 'lower') {
            a += 1;
        } else if (randomF === 'upper') {
            b += 1;
        } else if (randomF === 'number') {
            c += 1;
        } else if (randomF === 'symbol') {
            d += 1;
        }
    }
    console.log('lower:' , a / stat);
    console.log('upper:' , b / stat);
    console.log('number:' , c / stat);
    console.log('symbol:' , d / stat);
    */

    // 'push' radnom char to string 'length' times
    let createdPassword = '';
    for (let i = 0; i < length; i++) {
        let randomType = typesArr[Math.floor(Math.random() * typesCount)];
        createdPassword += randomFunctions[Object.keys(randomType)[0]]();
    }

    return createdPassword;
}

// Functions for each type of character - using ASCII
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/'
	return symbols[Math.floor(Math.random() * symbols.length)];
}


// Event listener
createElement.addEventListener('click', () => {
	const length = +lengthElement.value;
	const hasLower = lowercaseElement.checked;
	const hasUpper = uppercaseElement.checked;
	const hasNumber = numbersElement.checked;
	const hasSymbol = symbolsElement.checked;
	
	resultElement.innerText = createPassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});