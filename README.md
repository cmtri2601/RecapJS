# Common Practices for Professional JavaScript Programmers

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

