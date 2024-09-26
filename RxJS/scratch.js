import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { validUsers, invalidUsers, State } from './data.js';

// Producing code - creating observable: this is example => create observable from scratch. 
// In real case, create observable by event, array,.. (using method fromEvent, of,...)
const initObservable = new Observable((observer) => {
    observer.next(validUsers);

    // this line throw an error so the next line will not run
    observer.next(invalidUsers);
    
    // when run err or complete, observer will stop
    observer.error('Error: Something went wrong');
    observer.complete();

    // observer.next(validUsers); // this line will not run because observer already stop
})

// Pipe - contain OPERATORS that handle data before give it to observer
// Because pipe() don't change original observable, it return a new observable => so need assign to another Observable object
// It is a pure operation: the previous Observable stays unmodified.
const pipedObservable = initObservable.pipe(
    map(value => {
       console.log('1. First operator get a value: ' + value); //
       return value.data; // get data from object 
    } ),
    map(value => {
        console.log('2. Second operator get a value: ' + value); //
        return value.filter(user => user.state === State.ACTIVE); // filter user that not active
     } ), 
    map(value => {
        console.log('3. Third operator get a value: ' + value); //
        return value.reduce((sum, user) => sum + user.age, 0) / value.length; // get average age of user
     } ),
    map(value => {
        console.log('4. Fourth operator get a value: ' + value); //
        if (value > 18) {
            return value.toFixed(2); 
        } else {
            // when throw an error, observer will run error() method and stop observer
            throw new Error('Error: Age is not valid');
        }
    })
)

// Consuming code -  define observer how to execute each scenario
const firstObserver = {
    next: value => console.log('First observer get a value: ' + value),
    error: err => console.log('First observer get a err: ' + err),
    complete: () => console.log('First observer get a complete notification'),
}

const secondObserver = {
    next: value => console.log('Second observer get a value: ' + value),
    error: err => console.log('Second observer get a err: ' + err),
    complete: () => console.log('Second observer get a complete notification'),
}

// Subscribe - CONNECT observable (producing) & observer (consuming)
const firstConnection = pipedObservable.subscribe(firstObserver);
const secondConnection = pipedObservable.subscribe(secondObserver);

// Disposing 
firstConnection.unsubscribe();


