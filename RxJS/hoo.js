/*
  High order observable
  Higher Order Observable (HOO) là một Observable trả về một Observable, 
  nó giống như mảng nhiều chiều vậy - mảng 2 chiều chứa trong nó các mảng 1 chiều.

  Some HOO: 
    - mergeMap
    - concatMap
    - switchMap
*/

import { 
  interval, 
  take,
  map,
  mergeMap,
  concatMap,
  switchMap
} from 'rxjs';

const s1$ = interval(100).pipe(
  take(2),
  map(x => `s1: ${x}`)
)

const s2$ = interval(100).pipe(
  take(3),
  map(x => `s2: ${x}`)
)

// mergeMap - create 2-dimensional array but run concurrently
const mergedMap$ = s1$.pipe(
  mergeMap(valOfS1 => 
    s2$.pipe(
      map(valOfS2 => 
        "merge map: Outer value " + valOfS1 
        + ' Inter value ' +  valOfS2)
      )
    )
);

mergedMap$.subscribe(console.log);

// concatMap- create 2-dimensional array but run sequentially
const concatMap$ = s1$.pipe(
  concatMap(valOfS1 => 
    s2$.pipe(
      map(valOfS2 => 
        "concat map: Outer value" + valOfS1 
        + ' Inner value ' +  valOfS2)
      )
    )
);

setTimeout(() => {
  console.log('-----------------------------')
  concatMap$.subscribe(console.log);
}, 1000)

// switchMap - create 2-dimensional array but run sequentially
// but cancel the previous outer value if the most recent one is coming
// use case: in http request when we send multiple request and just need the most recent request
const switchMap$ = s1$.pipe(
  switchMap(valOfS1 => 
    s2$.pipe(
      map(valOfS2 => 
        "switch map: Outer value" + valOfS1 
        + ' Inner value ' +  valOfS2)
      )
    )
);

setTimeout(() => {
  console.log('-----------------------------')
  switchMap$.subscribe(console.log);
}, 2000)




