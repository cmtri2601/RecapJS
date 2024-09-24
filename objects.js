// BASIC METHOD OF DEFINING OBJECT
// 1. Object literal
const obj1 = { name: "John", age: 30 };
const obj2 = {};
obj2.name = "John";
obj2.age = 30;

// 2. Using new keyword
const obj3 = new Object();
obj3.name = "John";
obj3.age = 30;

// 3. Using constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const obj4 = new Person("John", 30);

/* -------------------------------------------------------------------- */
// OBJECT PROTOTYPE
/**
 * All JavaScript objects inherit properties and methods from a prototype.
 * can not add a new property to an existing object constructor. Exp: Person.nationality = "English";
 * To add a new property to a constructor, you must add it to the constructor function.
 *
 * All JavaScript objects inherit properties and methods from a prototype.
 * Date objects inherit from Date.prototype.
 * Array objects inherit from Array.prototype.
 * The Object.prototype is on the top of the prototype inheritance chain.
 * All JavaScript objects (Date, Array, RegExp, Function, ....) inherit from the Object.prototype.
 *
 * The JavaScript prototype property allows you to add new properties, methods to object constructors. !!!!
 */
Person.prototype.nationality = "Vietnamese";
Person.prototype.greet = function () {
  return "Xin chao";
};
console.log(obj4.nationality, obj4.greet());

/* -------------------------------------------------------------------- */
// OBJECT METHOD
// 1. Object.assign()
const obj5 = Object.assign({}, obj4);
console.log(Object.entries(obj5));

// 2. Object.entries()
const fruits = { apple: 400, orange: 200, banana: 300, kiwi: 700, mango: 500 };
for (let [fruit, quantity] of Object.entries(fruits)) {
  console.log(fruit, quantity);
}
const fruitsMap = new Map(Object.entries(fruits));
console.log(fruitsMap);

// 3. Object.fromEntries()
const fruitsEntries = Object.entries(fruits);
const fruitsObj = Object.fromEntries(fruitsEntries);
console.log(fruitsObj);

// 4. Object.keys() - Object.values()
console.log("Fruit keys", Object.keys(fruits));
console.log("Fruit values", Object.values(fruits));

// 5. Object.groupBy() - just support in browser - Node.js don't support this method - import cort-js to use it
// const fruitArr = [
//     {name:"apples", quantity:300},
//     {name:"bananas", quantity:500},
//     {name:"oranges", quantity:200},
//     {name:"kiwi", quantity:150}
//   ];
// const groupBy = Object.groupBy(fruitArr, ({value, quantity}) => {
//     return quantity > 450 ? 'big' : 'small';
// });
// console.log(groupBy);

/* -------------------------------------------------------------------- */
// OBJECT PROPERTIES
/*
    Adding or changing an object property
    Object.defineProperty(object, property, descriptor)

    // Create an Object:
        const person = {
        firstName: "John",
        lastName : "Doe",
        language : "EN"
        };

    // Add a Property
    Object.defineProperty(person, "year", {value:"2008"});

    Adding or changing object properties
    Object.defineProperties(object, descriptors)

    Accessing a Property
    Object.getOwnPropertyDescriptor(object, property)

    Accessing Properties
    Object.getOwnPropertyDescriptors(object)

    Returns all properties as an array
    Object.getOwnPropertyNames(object)

    Accessing the prototype
    Object.getPrototypeOf(object)

    The getOwnPropertyNames() method returns all properties.
    The Object.keys() method returns all enumerable properties.
    If you define object properties without enumerable:false, the two methods will return the same.
 */

/* -------------------------------------------------------------------- */
// OBJECT GET/SET
/*
    WHY USING GETTERS AND SETTERS?
        It gives simpler syntax
        It allows equal syntax for properties and methods
        It can secure better data quality
        It is useful for doing things behind-the-scenes
*/

// Define object
const counter1 = {counter : 0};

// Define setters and getters
Object.defineProperty(counter1, "reset", {
  get : function () {this.counter = 0;}
});
Object.defineProperty(counter1, "increment", {
  get : function () {this.counter++;}
});
Object.defineProperty(counter1, "decrement", {
  get : function () {this.counter--;}
});
Object.defineProperty(counter1, "add", {
  set : function (value) {this.counter += value;}
});
Object.defineProperty(counter1, "subtract", {
  set : function (value) {this.counter -= value;}
});

// Play with the counter:
console.log('counter1')
counter1.reset;
console.log(counter1)
counter1.add = 5;
console.log(counter1)
counter1.subtract = 1;
console.log(counter1)
counter1.increment;
console.log(counter1)
counter1.decrement;
console.log(counter1)

// rewrite example
const counter2 = {
    counter: 0,
    get reset() {this.counter = 0},
    get increment() {this.counter++},
    get decrement() {this.counter--},
    set add(value) {this.counter += value},
    set subtract(value) {this.counter -= value}
}

console.log('counter2')
counter2.reset;
console.log(counter2.counter)
counter2.add = 5;
console.log(counter2.counter)
counter2.subtract = 1;
console.log(counter2.counter)
counter2.increment;
console.log(counter2.counter)
counter2.decrement;
console.log(counter2.counter)

/* -------------------------------------------------------------------- */
// OBJECT PROTECTION
/*
    // Prevents re-assignment
    const car = {type:"Fiat", model:"500", color:"white"};

    // Prevents adding object properties
    Object.preventExtensions(object)

    // Returns true if properties can be added to an object
    Object.isExtensible(object)

    // Prevents adding and deleting object properties
    Object.seal(object)

    // Returns true if object is sealed
    Object.isSealed(object)

    // Prevents any changes to an object
    Object.freeze(object)

    // Returns true if object is frozen
    Object.isFrozen(object)
*/