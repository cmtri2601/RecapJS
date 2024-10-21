const log = console.log;

/** 
 * GC (Garbage Collection) use Mark-and-Sweep algorithm to free up memory
 * object is marked as reachable if it's reachable from the root
 * otherwise, it's marked as unreachable and will be collected by GC
 * 
 * The WeakSet is weak, meaning references to objects in a WeakSet are 
 * held weakly. If no other references to a value stored in the WeakSet 
 * exist, those values can be garbage collected.
 * 
 * The WeakMap is weak, meaning references to key objects in a WeakMap are
 * held weakly. If no other references to a key stored in the WeakMap exist,
 * those keys can be garbage collected.
 * 
 * Values in WeakSet and key in WeakMap must be garbage collectable, 
 * including objects and non-register symbols. 
 * */ 

// Strong Ref
let person = { id: 123, name: 'John'}; // 1st ref to object
const arr = [person]; // 2nd ref to object
// this array is strong ref because it holds the reference to the object
// if we remove reference of person variable, object will NOT be collected by GC
// because arr still holds the reference to the object

// if we want GC to collect the object, we need to remove all references to it
person = null;
// arr[0] = null;

log('Strong Ref');
log(person);
log(arr);



/** 
 * Weak ref
 * 
 * if we remove reference outside the WeakSet or WeakMap, the object will be collected by GC
 * */ 

/**
 * Set - unique list of values (any datatypes), strong ref
 * WeakSet - value must be object, can't loop, weak ref
 * 
 * Use case : DETECTING CIRCULAR REFERENCES
 */
// const weakSet = new WeakSet([1, 1]); // TypeError: Invalid value used in weak set
let obj1 = {x: 1};
let obj2 = {y: 2};
const weakSet = new WeakSet([obj1, obj2]);
log(weakSet, weakSet.has(obj1), weakSet.has(obj2));

// this remove this reference to obj1 so it will be collected by GC
// this not happen with Set, because Set is strong ref and it holds the reference to the obj1 itself 
obj1 = null;

log(weakSet, weakSet.has(obj1), weakSet.has(obj2));



/**
 * Map - unique list of keys (any datatypes), strong ref
 * WeakMap - key must be object, can't loop, weak ref
 * 
 * Use case: CACHING DATA, STORING PRIVATE DATA
 */
let obj3 = {x: 1};
let obj4 = {y: 2};
const weakMap = new WeakMap([[obj3, 'x'], [obj4, 'y']]);
log(weakMap, weakMap.get(obj3), weakMap.has(obj4));
obj3 = null;
log(weakMap, weakMap.get(obj3), weakMap.has(obj4));
// we can also do this
let obj5 = obj4;
obj4 = null; // obj5 still holds the reference to the object, so it will not be collected by GC
log(weakMap, weakMap.has(obj4), weakMap.has(obj5)); // obj4 has no longer holds the reference to the object
