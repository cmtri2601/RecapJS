/*
  A Subject is like an Observable, but can multicast to 
  many Observers. Subjects are like EventEmitters: they 
  maintain a registry of many listeners.

  A subject can't subscribe 2 or more observables.
  Subject can only subscribe to one observable at a time. 

  Some type of subject: 
    - Subject
    - Behavior Subject: keep 1 value
    - Replace Subject: keep number of value (number parameter), in recent time (windowTime parameter)
    - Async Subject: just emit final value of stream when it's complete
*/
import { Subject, from, interval, take } from 'rxjs' 

// subject is both observable and observer
const subject = new Subject();

const firstObserver = {
  next: value => console.log('1st observer :', value)
}

const secondObserver = {
  next: value => console.log('2nd observer :', value)
}


// as observable => subscribe by observer
subject.subscribe(firstObserver);
// subject.subscribe(secondObserver);

// self multicast
subject.next('data which multicast from subject');

// as observer => subscribe to other observable
// const arr = ['other 1', 'other 2', 'other 3'];
// a subject can't subject 2 observable
// from(arr).subscribe(subject);


// ------------ async case - like stream video ------------ //
const asyncObservable$ = interval(300).pipe(take(5));
asyncObservable$.subscribe(subject);
// subject.subscribe(secondObserver);

setTimeout(() => { subject.subscribe(secondObserver)}, 1000);