// Calculator operations
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

// Function to call the operation
const operate = (a, b, operation) => {

    if (!operations[operation]) {
        console.log('Invalid operation');
        isError = true;
        return 'ERROR';
    }
    return operations[operation](a, b);
};

// Functions for the helpers (keys that aren't numbers nor operators)
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

// Variables used to store previous number, current operation and state
let prev = '', operation = '';
let isError = false;
let isResult = false;

// Getting both display elements
const mainDisplay = document.getElementById('main');
const secondaryDisplay = document.getElementById('secondary');
 
// Adding event listener for when numbers are clicked
const numbers = document.querySelectorAll('.number');

numbers.forEach(number => {
    number.addEventListener('click', () => {
        // If we have a result or error we have to clear the secondary display
        // and restart the main display
        if (isResult || isError) {
            mainDisplay.textContent = number.textContent;
            secondaryDisplay.textContent = '';
            isError = false;
            isResult = false;
        } else {
            // Check if there is already a decimal point in our current number
            if (number.id === 'decimal' && mainDisplay.textContent.indexOf('.') !== -1) return;

            // Add another number to the main display
            mainDisplay.textContent += number.textContent;
        }
    })
});


// Adding event listener for when operators are clicked
const operators = document.querySelectorAll('.operator');

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        const currentVal = mainDisplay.textContent;
        // If there isn't a value in the main display or if we are in an Error state
        // operators shouldn't work
        if (!currentVal || isError) return;

        if (operator.id === 'equals') {
            // If we already have a result or we don't have a previous number to
            // do the operation then ignore equals
            if (isResult || !prev) return;

            // We should save the full operation in the second display and present
            // the result in the main display
            secondaryDisplay.textContent += (' ' + currentVal + ' ' + operator.textContent);
            mainDisplay.textContent = operate(Number(prev), Number(currentVal), operation);

            // Reset previous number and operation and go to isResult state
            prev = '';
            operation = '';
            isResult = true;
        } else {
            isResult = false;
            // Save the new operation
            operation = operator.id;
            if (prev) {
                // If we already have an operation ongoing then run it and set
                // its result as the new previous
                prev = operate(Number(prev), Number(currentVal), operation);
            } else {
                // If not just save the current number as the previous
                prev = currentVal;
            }

            // Display the previous number and the operator on the secondary screen
            // and clear the main one
            secondaryDisplay.textContent = prev + ' ' + operator.textContent;
            mainDisplay.textContent = '';
        }
    })
});


// Adding event listener for when helpers are clicked
const helpers = document.querySelectorAll('.helper');

helpers.forEach(helper => {
    helper.addEventListener('click', () => {
        helperFunctions[helper.id]();
    })
});


// Keyboard support

// Hashtable to convert the key output from the events to
// the ids of my divs
const hashtable ={
    Escape: 'clear',
    Backspace: 'delete',
    '%': 'percentage',
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '=': 'equals',
    Enter: 'equals',
    '.': 'decimal'
};

// When a key is pressed
document.addEventListener('keydown', (e) => {
    let key = e.key;
    // If the key is in the hashtable, change it to the id
    if(hashtable[key]) key = hashtable[key];
    // If it's a number is already equal to the id
    const el = document.getElementById(key);
    // If the key isn't a number nor in the hashtable, trigger a click event
    // for that element
    if(el) return el.click();
});