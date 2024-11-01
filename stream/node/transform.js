/**
 * A transform stream is the more interesting duplex stream because 
 * its output is computed from its input.
 * 
 * For a transform stream, we don’t have to implement the read or 
 * write methods, we only need to implement a transform method, 
 * which combines both of them. It has the signature of the write 
 * method and we can use it to push data as well.
 */

import { Transform } from "stream"

const upperLetterTrans = new Transform({
    // use transform method instead of read and write like duplex
    transform(chunk, encoding, callback) {
        const str = chunk.toString();
        
        // end stream typing "finish"
        if (str.trim() === 'finish') {
            this.end('This is the end of stream\n');
        } else {
            // transform 
            this.push(str.toUpperCase());
        }
        callback();
    },
    // flush the buffer
    // in this case we don't have buffer so we just flush smt at the end of stream
    // but we use end() + can not push more data after end() => don't use this method
    // flush() {
    //     // this.push("Imagine this is the remain of buffer. And this is the end of stream")
    // }
})

process.stdin.pipe(upperLetterTrans).pipe(process.stdout);