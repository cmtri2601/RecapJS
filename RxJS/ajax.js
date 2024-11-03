const { ajax } = rxjs.ajax;
const { map } = rxjs.operators;

const ajax$ = ajax('https://api.crossref.org/works?query.title=rxjs&rows=3');
ajax$
    .pipe(
        map(res => res.response.message.items.map(item => item.title.toString()))
    )
    .subscribe({
        next: value => console.log('Result: ', value),
        error: err => console.log('Error: ', err), 
        complete: () => console.log('Complete ajax observable') 
    });