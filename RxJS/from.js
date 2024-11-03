import { from } from 'rxjs';
import { validUsers } from './data.js';

/**
 * from operator can go with array, set, map, promise, iterable, observable, etc.
 */

// array
const array$ = from(validUsers.data);
array$.subscribe({
    next: value => console.log('Value: ', value),
    error: err => console.log('Error: ', err), // this case will not happen
    complete: () => console.log('Complete array observable') 
});

// set 
const set = new Set([1 ,{x: 1}, "tri"]);
const set$ = from(set);
set$.subscribe({
    next: value => console.log('Value: ', value),
    complete: () => console.log('Complete set observable') 
});

// map
const map = new Map([['tri', 2000], ['chip', 2022], ['xo', 2023]]);
const map$ = from(map);
map$.subscribe({
    next: value => console.log('Value: ', value),
    complete: () => console.log('Complete map observable') 
});

// promise
const search = fetch(`https://api.crossref.org/works?query.title=rxjs&rows=3`);
const promise$ = from(search);
promise$.subscribe({
    next: value => console.log('Value: ', value),
    error: err => console.log('Error: ', err), 
    complete: () => console.log('Complete promise observable') 
})