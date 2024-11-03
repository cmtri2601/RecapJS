/*
  Combination operators combine observables together
  Some combination operator: 
    - merge
    - concat
    - combineLatest
    - zip
*/

import { 
  interval, 
  take,
  map,
  merge,
  concat,
  combineLatest,
  zip
} from 'rxjs';


const s1$ = interval(300).pipe(
  take(5),
  map(x => `s1: ${x}`)
)

const s2$ = interval(400).pipe(
  take(3),
  map(x => `s2: ${x}`)
)

const s3$ = interval(500).pipe(
  take(3),
  map(x => `s3: ${x}`)
)

// merge - concurrently emits all values from every given input Observable.
const merge$ = merge(s1$, s2$, s3$);
merge$.subscribe({
  next: value => console.log("merge: ", value)
})

// concat - sequentially emits all values from the first given Observable and then moves on to the next.
const concat$ = concat(s1$, s2$, s3$);
setTimeout(() => {
  console.log('-----------------------------')
  concat$.subscribe({
    next: value => console.log("concat: ", value)
  })
}, 1700)

// combineLatest - values are calculated from the latest values of each of its input Observables.
const combineLatest$ = combineLatest(s1$, s2$, s3$);
setTimeout(() => {
  console.log('-----------------------------')
  combineLatest$.subscribe({
    next: value => console.log("combineLatest: ", value)
  })
}, 6000)

// zip - subscribe to all inner observables, waiting for each to emit a value. Once this occurs, all values with the corresponding index will be emitted. This will continue until at least one inner observable completes.
const zip$ = zip(s1$, s2$, s3$);
setTimeout(() => {
  console.log('-----------------------------')
  zip$.subscribe({
    next: value => console.log("zip: ", value)
  })
}, 8000)
