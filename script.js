const operations = {
    add: (a, b) => {
        return a + b;
    },

    subtract: (a, b) => {
        return a - b;
    },

    multiply: (a, b) => {
        return a * b;
    },

    divide: (a, b) => {
        if (!b) {
            isError = true;
            return 'ERROR';
        }
        return a / b;
    }
}

const operate = (a, b, operation) => {

    if (!operations[operation]) {
        console.log('Invalid operation');
        isError = true;
        return 'ERROR';
    }
    return operations[operation](a, b);
};

const helperFunctions = {
    clear: () => {
        mainDisplay.textContent = '';
        secondaryDisplay.textContent = '';
        prev = '';
        operation = '';
        isError = false;
        isResult = false;
    },

    delete: () => {
        if (!mainDisplay.textContent || isError) return;
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    },

    percentage: () => {
        if (!mainDisplay.textContent || isError) return;
        mainDisplay.textContent /= 100;
    }
}

let prev = '', operation = '';
let isError = false;
let isResult = false;

const mainDisplay = document.getElementById('main');
const secondaryDisplay = document.getElementById('secondary');

const numbers = document.querySelectorAll('.number');

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (isResult || isError) {
            mainDisplay.textContent = number.textContent;
            secondaryDisplay.textContent = '';
            isError = false;
            isResult = false;
        } else {
            if (number.id === 'decimal' && mainDisplay.textContent.indexOf('.') !== -1) return;

            mainDisplay.textContent += number.textContent;
        }
    })
});

const operators = document.querySelectorAll('.operator');

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        const currentVal = mainDisplay.textContent;
        if (!currentVal || isError) return;

        if (operator.id === 'equals') {
            if (isResult) return;

            secondaryDisplay.textContent += (' ' + currentVal + ' ' + operator.textContent);
            mainDisplay.textContent = operate(Number(prev), Number(currentVal), operation);
            prev = '';
            operation = '';
            isResult = true;
        } else {
            isResult = false;
            if (prev) {
                prev = operate(Number(prev), Number(currentVal), operation);
                operation = operator.id;

            } else {
                prev = currentVal;
                operation = operator.id;
            }

            secondaryDisplay.textContent = prev + ' ' + operator.textContent;
            mainDisplay.textContent = '';
        }
    })
});

const helpers = document.querySelectorAll('.helper');

helpers.forEach(helper => {
    helper.addEventListener('click', () => {
        helperFunctions[helper.id]();
    })
});