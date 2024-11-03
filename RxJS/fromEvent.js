const { fromEvent } = rxjs;

// SAME WITH EVENT LISTENER 

const btn = document.querySelector('#btn');

// good practice: use $ to name variable that store Observable
const btnStream$ = fromEvent(btn, 'click');
btnStream$.subscribe({
    next: event => console.log('Click event: ', event),
    error: err => console.log('Error: ', err), // this case will not happen
    complete: () => console.log('Complete') // this case will not happen
})

const output = document.querySelector('#default');

const moveStream$ = fromEvent(document, 'mousemove');
moveStream$.subscribe({
    next: event => {
        output.innerHTML = `<h5>X: ${event.clientX}, Y: ${event.clientY}</h5>`;
    },
});