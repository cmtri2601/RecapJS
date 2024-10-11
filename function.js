// test function
function sum(...a) {
    return a.reduce((acc, current) => {
        return acc + current;
    }, 0);
}

const sumArrow = (...a) => {
    return a.reduce((acc, current) => {
        return acc + current;
    }, 0);
}

console.log(sum(1, 2, 3, 4));
console.log(sumArrow(1, 2, 3, 4));

// scope, apply, call, bind, closures
const obj  = {
    firstName: 'John',
    lastName: 'Doe',
    birthYears: 2000,
    getFullName: function() {
        return this.firstName + ' ' + this.lastName;
    },
    getThis: function() {
        return this;
    },
    getFullNameArrow: () => {
        console.log('This in arrow function: ', this);
        return this.firstName + ' ' + this.lastName; // arrow function don't have this
    },
    getAge: function() {
        return new Date().getFullYear() - this.birthYears;
    },
    calcAge: function(year) {
        return year - this.birthYears;
    },
    display: function() {
        let x = document.getElementById('textX'); 
        x.value = this.getFullName ? this.getFullName() : "bullshit";
        console.log(this);
    }

}

const anotherObj = {
    firstName: 'Jane',
    lastName: 'Doe',
    birthYears: 2004,
}

console.log(obj.getFullName()); 
console.log(obj.getThis().firstName); 
console.log(obj.getFullNameArrow()); 
console.log(obj.getAge());
console.log(obj.calcAge(2100));

console.log(obj.getFullName.call(anotherObj));
console.log(obj.getAge.call(anotherObj));
console.log(obj.calcAge.call(anotherObj, 2100));
console.log(obj.calcAge.apply(anotherObj, [2100]));

// bind 
// use browser to test (document just exist in browser environment)
// setTimeout(obj.display, 3000);

const button = document.getElementById('btn');
// button.addEventListener('click', obj.display); // "this" in this case is button
button.addEventListener('click', obj.display.bind(obj)); // "this" in this case is obj



// closures - enforce encapsulation - a fundamental aspect of OOP.
const closure = (function() {
    // this function is a closure that encapsulates a private variable
    
    // private variable need to protect
    let counter = 0;

    // public method to access private variable
    return {
        add: () => ++counter,
        sub: () => --counter,
    }
})();
console.log(closure.add());
console.log(closure.add());
console.log(closure.add());
console.log(closure.sub());
console.log(closure.sub());