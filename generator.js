// generators function is a functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances
// generators function have asterisk (*) after function keyword
// this function return an iterator object (other way to create is using Symbol.iterator - some_collection[Symbol.iterator]();)
// yield keyword ( quite similar to return keyword ) is used to pause and resume a generator function
// the return object value from yield keyword is {value: any, done: boolean}

// simple example
function* simpleGenerator() {
    console.log('Start');
    yield 1;
    console.log('After 1st yield');
    yield 2;
    console.log('After 2nd yield');
    yield 3;
    console.log('After 3rd yield');
}

const simpleGen = simpleGenerator();
console.log('simpleGen (generator instance): ', simpleGen); // simpleGen:  Object [Generator] {}

// code will not run until next() method is called, 'Start' have not printed yet
console.log(simpleGen.next()); // Start, {value: 1, done: false}

// code will pause at yield 1, and resume at next() method is called again
console.log(simpleGen.next()); // After 1st yield, {value: 2, done: false}
console.log(simpleGen.next()); // After 2nd yield, {value: 3, done: false}

// there is no more yield, so done is true, the code from last yield to the end of function will execute
console.log(simpleGen.next()); // After 3rd yield, {value: undefined, done: true}



// use case: infinite loop
function*  generateId(firstId = 1) {
    let id = firstId;
    while (true) {
        yield id++;
    }
}

const idGen = generateId();
console.log(idGen.next()); // {value: 1, done: false}
console.log(idGen.next()); // {value: 2, done: false}
// ...  create id forever

// return to complete a generator instance
console.log(idGen.return()); // {value: undefined, done: true}
console.log(idGen.next()); // {value: undefined, done: true}

// advance feature: past value to next()
function* increaseGenerator() {
    let id = 1;
    while (true) {
        const increment = yield id; // increment get arguments from next() method
        if (!increment) {
            id += increment;
        } else {
            id++;
        }
    }
}

const increaseGen = increaseGenerator();
console.log(increaseGen.next()); // {value: 1, done: false} - always start with 1
console.log(increaseGen.next(2)); // {value: 3, done: false}
console.log(increaseGen.next()); // {value: 4, done: false}
console.log(increaseGen.next(-1)); // {value: 3, done: false}
