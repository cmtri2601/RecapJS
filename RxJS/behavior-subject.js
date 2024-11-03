/*
  Một trong các biến thể của Subject đó là BehaviorSubject, 
  nó là biến thế có khái niệm về “the current value”. 
  BehaviorSubject lưu trữ lại giá trị mới emit gần nhất 
  để khi một Observer mới subscribe vào, nó sẽ emit giá trị đó 
  ngay lập tức cho Observer vừa rồi.
  
  BehaviorSubjects are useful for representing “values over time”. 
  For instance, an event stream of birthdays is a Subject, 
  but the stream of a person’s age would be a BehaviorSubject.
*/

import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

// although 2 is emitted but it's the recent value of object
// => so observerB still get it
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);

//result
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3