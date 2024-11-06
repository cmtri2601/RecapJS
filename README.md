# Common Practices for JavaScript Programmers

Here are some common practices that professional programmers follow when coding in JavaScript, sourced from W3Schools:

1. **Use Strict Mode**
    - Enforce stricter parsing and error handling in your JavaScript code by using `"use strict";`.

2. **Variable Declarations**
    - Always declare variables using `let`, `const`, (`var` for old browser, shouldn't use in modern project - use let instead) to avoid creating global variables.

    - What is Good?
        let and const have block scope.
        let and const can not be redeclare.
        let and const must be declared before use.
        let and const does not bind to this.
        let and const are not hoisted.

    - What is Not Good?
        var always have global scope
        var does not have to be declared.
        var is hoisted.
        var binds to this.

3. **Consistent Naming Conventions**
    - Use camelCase for variable and function names.
    - Use PascalCase for class names.
    - Use $ to name important function => $ = document.querySelector(), $$ = document.querySelectorAll().
    - Use _ to name private properties.

4. **Avoid Global Variables**
    - Minimize the use of global variables to reduce the risk of name conflicts and bugs.

5. **Use Comments**
    - Write comments to explain complex code and logic.

6. **Avoid Eval**
    - Avoid using `eval()` as it can lead to security vulnerabilities and performance issues.

7. **Use === Instead of ==**
    - Use strict equality (`===`) to avoid type coercion issues.

8. **Should read 4 chapters of String again**

9. **Should read Number method about converting number**

10. **Array**
    - Array is a special kind of Object: arrays use numbered indexes, objects use named indexes.
    - Use Array.isArray() to check whether variable is a array.
    - Method pop, shift return value that was removed, method push, unshift return length of array afterward
    - Using delete() leaves undefined holes in the array. Use pop() or shift() instead.
    - The difference between the new toSpliced() method and the old splice() method is that the new method creates a new array, keeping the original array unchanged, while the old method altered the original array.
    - toSorted() and sort() - toReversed and reversed()
    - use .apply to some function in Math like Math.min.apply, Math.max.apply

11. **This**
    In JavaScript, the this keyword refers to an object.
    The this keyword refers to different objects depending on how it is used:
        - In an object method, this refers to the object.
        - Alone, this refers to the global object.
        - In a function, this refers to the global object.
        - In a function, in strict mode, this is undefined.
        - In an event, this refers to the element that received the event.
        - Methods like call(), apply(), and bind() can refer this to any object.
        - **This of arrow function in browser is Window, but in node env is {}** 

12. **RxJS most popular operators**
    Creation operators: 
        - of
        - from
        - fromEvent
    Pipe-able operators: 
        - map
        - filter
        - take

        - mergeMap
        - switchMap
        - concatMap

        - bufferTime
        - debounceTime
        - throttleTime
        - distinctUntilChanged

        - combineLatest
        - zip

        - catchError
        - retry

13. **setTimeout(() => {}, 0)**
    - What this video: https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=3s
    - setTimeout even with delay = 0 still run after synchronous code. (because the block code in side callback of setTimeout go to QUEUE and wait till STACK empty then move to stack to execute)

14. **Debounce & Throttle**
    - Technique to improve the performance of application by reducing the number of times a 
    particular action is taken.

    - Source: https://www.youtube.com/watch?v=cjIswDCKgu0

15. **CommonJS vs ES Module**
    - **CommonJS:**
        - Used primarily in Node.js.
        - Uses `require()` to import modules.
        - Uses `module.exports` to export modules.
        - Synchronous module loading.
        - Example:
          ```javascript
          // Importing a module
          const moduleA = require('./moduleA');

          // Exporting a module
          module.exports = {
              functionA,
              functionB
          };
          ```

    - **ES Module:**
        - Standardized module system for JavaScript.
        - Uses `import` to import modules.
        - Uses `export` to export modules.
        - Asynchronous module loading.
        - Example:
          ```javascript
          // Importing a module
          import { functionA, functionB } from './moduleA';

          // Exporting a module
          export const functionA = () => { ... };
          export const functionB = () => { ... };
          ```

16. **CDN**
    - A Content Delivery Network (CDN) is a system of distributed servers that deliver web content to a user based on their geographic location, the origin of the webpage, and a content delivery server. CDNs help to improve the performance, speed, and reliability of websites by caching content closer to the user's location.

17. **Bundle**
    - A bundle is a collection of files and assets that are combined into a single file or a few files to reduce the number of HTTP requests needed to load a webpage. Bundling helps to improve the performance and load times of web applications by minimizing the number of files that need to be fetched from the server. 
    - Tools like Webpack, Rollup, and Parcel are commonly used for bundling JavaScript, CSS, and other assets.

    #### Loader and Plugin in Bundling Tools

    **Loader:**
    - Loaders are used in bundling tools like Webpack to PREPROCESS files before they are added to the bundle. They transform the source code of a module. For example, you can use loaders to convert TypeScript to JavaScript, or to load CSS files.

    **Plugin:**
    - Plugins are used to perform a wider range of tasks in the bundling PROCESS. They can optimize bundles, manage assets, inject environment variables, and more. Plugins are more powerful than loaders and can be used to customize the entire build process.

    Examples:
    - **Loaders:** `babel-loader`, `css-loader`, `ts-loader`
    - **Plugins:** `HtmlWebpackPlugin`, `DefinePlugin`, `MiniCssExtractPlugin`

18. **Intersection Observer**
    - The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

    - **Use Cases:**
        - Lazy loading of images or other content as it enters the viewport.
        - Implementing infinite scrolling by loading more content as the user scrolls down.
        - Reporting of visibility of advertisements for viewability metrics.
        - Animating elements when they come into view.

    - **When fire**
        - The Intersection Observer API allows you to configure a callback that is called when either of these circumstances occur:
            - A target element intersects either the device's viewport or a specified element. That specified element is called the root element or root for the purposes of the Intersection Observer API.
            - The first time the observer is initially asked to watch a target element.

    - **Basic Example:**
        ```javascript
        // Create an intersection observer instance
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Element is in view!');
                    // Perform actions when the element is in view
                    observer.unobserve(entry.target); // Stop observing if no longer needed
                }
            });
        });

        // Target element to observe
        const target = document.querySelector('.target-element');
        observer.observe(target);
        ```

    - **Options:**
        - `root`: The element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport if not specified.
        - `rootMargin`: Margin around the root. Can have values similar to the CSS margin property (e.g., "10px 20px 30px 40px").
        - `threshold`: A single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.

        ```javascript
        const options = {
            root: null, // Use the viewport
            rootMargin: '0px',
            threshold: 0.5 // 50% of the target's visibility
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(target);
        ```