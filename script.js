const operations = {
    add: (a,b) => {
        return a + b;
    },

    subtract: (a,b) => {
        return a - b;
    },

    multiply: (a,b) => {
        return a * b;
    },

    divide: (a,b) => {
        if(!b) return 'ERROR';
        return a/b;
    }
}

const operate = (a, b, operation) => {

    if(!operations[operation]){
        console.log('Invalid operation');
        return 'ERROR';
    }
    return operations[operation](a, b);
};

const a = 2;
const b = 4;

console.log(operate(a, b, 'add'));
console.log(operate(a, b, 'subtract'));
console.log(operate(a, b, 'multiply'));
console.log(operate(a, b, 'divide'));
console.log(operate(a, b, 'power'));