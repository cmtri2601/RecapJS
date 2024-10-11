const input = document.querySelector('#textName');
const defaultArea = document.querySelector('#default');
const debounceArea = document.querySelector('#debounce');
const throttleArea = document.querySelector('#throttle');

const search = async (name = '', resultArea) => {
    const url = `https://api.crossref.org/works?query.title=${name}&rows=3`
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const works = data.message.items.map(item => ({
            title: item.title?.[0],
        }));
        showResult(works, resultArea);
    } catch (error) {
        console.log('Error: ' + error);
    }
}

const showResult = (data, resultArea) => {
    let content = "There's no result for this title";
    if (data?.length) {
        content = data.reduce((text, item, index) => {
            return `${text} ${index + 1}. ${item.title} <br>`;
        }, '');

    }
    resultArea.innerHTML = content;
}

// search each time keyup
const handleNormalSearch = (e) => {
    const name = e.target.value;
    search(name, defaultArea);
}

/**
 * Debounce:
 * The debounce technique is a programming pattern used to limit the rate 
 * at which a function is executed. It ensures that a function is only called 
 * after a certain amount of time has passed **since the LAST TIME it was INVOKED**. 
 * This is particularly useful for scenarios where you want to reduce the 
 * number of times a function is called, such as handling user input events 
 * like keystrokes or window resizing.
 * 
 * Use case: autocomplete filed, search field
 */
const debounce = (cb, delay = 1000) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    }
}

// create closure for timeout
const debounceSearch = debounce(search);

const handleDebounceSearch = (e) => {
    const name = e.target.value;
    // can't not put debounceSearch here because it will create new instance of debounceSearch
    // => can't keep the timeout value
    // const debounceSearch = debounce(search); 
    debounceSearch(name, debounceArea);
}

/**
 * Throttle:
 * The throttle technique is a way to control the rate at which a function is executed. 
 * It ensures that a function is not called more frequently than a **specified INTERVAL**. 
 * This is particularly useful in scenarios where you want to limit the number of times 
 * a function is executed over time, such as handling events that fire rapidly.
 * 
 * Use case: scroll event, resize event, drag and drop, mousemove
 */
const throttle = (cb, delay = 1000) => {
    let shouldWait = false;
    let waitingArgs;
    const timeoutFunc = () => {
        if (!waitingArgs) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    }

    return function(...args) {
        if (shouldWait) {
            waitingArgs = args;
            return;
        };
        
        cb(...args);
        shouldWait = true;

        setTimeout(timeoutFunc, delay)
    }
}

// create closure for shouldWait
const throttleSearch = throttle(search);
 
const handleThrottleSearch = (e) => {
    const name = e.target.value;
    throttleSearch(name, throttleArea);
    
}

/**
 * Add event listener
 */
input.addEventListener('keyup', handleNormalSearch);
input.addEventListener('keyup', handleDebounceSearch);
input.addEventListener('keyup', handleThrottleSearch);




