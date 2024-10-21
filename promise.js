// A Promise is an Object that links Producing code and Consuming code!!!

// PRODUCING CODE
const promise = new Promise((resolve, reject) => {
    console.log('Start promise');
    setTimeout(() => {
        resolve('Success')
    }, 1000);
})

const failPromise = new Promise((resolve, reject) => {
    console.log('Start failPromise');
    setTimeout(() => {
        reject('Failed')
    }, 500);
})

// Check point
console.log('------- Check point -------');


// CONSUMING CODE
promise
    .then((value) => {console.log(value);})
    .finally(() => {console.log('Promise Finally');});

failPromise
    .then((value) => {console.log(value);})
    .catch((value) => {console.log(value);}) // if we don't catch here, the error will be thrown
    .finally(() => {console.log('Fail Promise Finally');});




// ----------------- Read file - use AJAX (need browser environment) -----------------
function getFile (url) {
    const promise = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest(); // only can run on browser
        req.onload = function() {
            if (this.status == 200) {
                resolve(this);
            } else {
                reject(this);
            }
        }
        req.open('GET', url);
        req.send();
    });
    return promise;
}

const file_promise = getFile('ajax-file.txt');
file_promise
    .then((value) => console.log('Success',value))
    .catch((value) => console.log('Fail',value))
    .finally(() => console.log('Done reading file'));