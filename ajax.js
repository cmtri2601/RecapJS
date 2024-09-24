// AJAX stands for Asynchronous JavaScript And XML.

/**
 * AJAX just uses a combination of:
 *      A browser built-in XMLHttpRequest object (to request data from a web server)
 *      JavaScript and HTML DOM (to display or use the data)
 */

/**
 * With AJAX, you can:
 *      Read data from a web server - after the page has loaded
 *      Update a web page without reloading the page
 *      Send data to a web server - in the background
 */

/**
 * How AJAX Works:
 *      1. An event occurs in a web page (the page is loaded, a button is clicked)
 *      2. An XMLHttpRequest object is created by JavaScript
 *      3. The XMLHttpRequest object sends a request to a web server
 *      4. The server processes the request
 *      5. The server sends a response back to the web page
 *      6. The response is read by JavaScript
 *      7. Proper action (like page update) is performed by JavaScript
 */

/** -------------------------------------------------------------- */ 

// Example 1: connect with backend server
// Create an XMLHttpRequest object
const xhttp = new XMLHttpRequest(); 

// Define a function to be executed when the request is completed
xhttp.onload = function() {
    console.log(this.responseText); // show response text
}

// Open the request
xhttp.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

// Send the request
xhttp.send();

/** -------------------------------------------------------------- */ 

// Example 2: connect with FILE
// Create an XMLHttpRequest object
const xhttp_file = new XMLHttpRequest();

// Define a function to be executed when the request is completed
xhttp_file.onload = function() {
    console.log(this); // show response
}

// Open the request
xhttp_file.open('GET', 'ajax-file.txt', true);

// Send the request
xhttp_file.send();