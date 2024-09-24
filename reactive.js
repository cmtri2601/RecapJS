// for each

// primitive
const arr = [1, 2, 3, 4, 5];

arr.forEach((item, index, ref) => {
    item++;
});

arr.forEach((item, index, arr) => {
    console.log(item, index, arr);
});

// reference
const ref = [{value: 1}, {value: 2}, {value: 3}];

ref.forEach((item, index, ref) => {
    item.value++;
});

ref.forEach((item, index, ref) => {
    console.log(item, index, ref);
});


// map
const a_map = arr.map((item, index) => {
    return item + index;
});

console.log(arr, a_map);

// filter
const a_filter = arr.filter((item, index) => {
    return item % 2;
});

console.log(arr, a_filter);

// reduce
const a_reduce = arr.reduce((acc, current, index) => {
    return acc * current * (index + 1) ;
}, 1);

console.log(arr, a_reduce);

// some
const a_some = arr.some((item) => {
    return item > 5;
});

// flatten
Array.prototype.flatten = function() {
    return [].concat.apply([], this); // q: explain this line
    // a: apply() calls a function with a given this value and arguments provided as an array (or an array-like object).
    // concat() is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
    // return [].concat(this); // this same with "call" not apply - this can't work because this don't separate items like apply (handle with array)
    // return [].concat.call([], this); // same result with previous line

}

const mulArr = [[1, 2], [3, 4], [5, 6]];
const flatten = mulArr.flatten();

console.log(mulArr, flatten);