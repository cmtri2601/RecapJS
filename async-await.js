// normal promise
function returnPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Success')
        }, 1000);
    })
}
const promise = returnPromise();

// resolve
function returnResolve() {
    return Promise.resolve('Success');
}
const resolve = returnResolve();

// string
function returnString() {
    return 'Success';
}

// string + async => promise !!!! PUT 'ASYNC' IN FUNCTION NAME MAKE IT RETURN PROMISE
async function returnStringAsync() {
    return 'Success';
}

// await can only use in async function

// example
const asyncFunction = async () => {
    // case success
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Promise in async resolved');
        }, 2000);
    })
    const result = await promise;
    console.log(result);
    console.log('Bellow await'); // wait for promise to resolve/reject

    // case fail
    const failPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Promise in fail async rejected');
        }, 1000);
    })

    // because reject => need to use try catch
    try {
        const failResult = await failPromise;
        console.log('Resolved', failResult);
    } catch (error) {
        console.log('Rejected', error);
    }
    console.log('Bellow fail await'); // wait for promise to resolve/reject
}

asyncFunction();