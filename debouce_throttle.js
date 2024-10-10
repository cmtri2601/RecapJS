const nameInput = document.querySelector('#textName');
const resultArea = document.querySelector('#searchResult');

const search = async (name = '') => {
    const url = `https://api.crossref.org/works?query.title=${name}&rows=10`
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const works = data.message.items.map(item => ({
            title: item.title?.[0],
        }));
        return works;
    } catch (error) {
        console.log('Error: ' + error);
    }
}

const showResult = (data) => {
    let content = "There's no result for this title";
    if (data?.length) {
        content = data.reduce((text, item, index) => {
            return `${text} ${index + 1}. ${item.title} <br>`;
        }, '');

    }
    resultArea.innerHTML = content;
}

// search each time keyup
const normalSearch = async (e) => {
    const name = e.target.value;
    const works = await search(name);
    showResult(works);
    
}

/**
 * Throttle:
 * A throttle function ensures that a function is called at most once 
 * in a specified time period, regardless of how many times the event 
 * is triggered. This can help prevent performance issues by reducing 
 * the number of times a function is executed.
 */

const throttleSearch = async (e) => {
    const name = e.target.value;
    const works = await search(name);
    showResult(works);
    
}

/**
 * Debounce:
 * Debouncing is a programming practice used to ensure that a function 
 * is not called too frequently. It limits the rate at which a function 
 * can fire. This is particularly useful for performance optimization in 
 * scenarios where a function might be called repeatedly in quick succession, 
 * such as during user input events like keystrokes, window resizing, or scrolling.
 */
const debounceSearch = async (e) => {
    const name = e.target.value;
    const works = await search(name);
    showResult(works);
    
}

nameInput.addEventListener('keyup', normalSearch);




