import fs from "fs";

/* Readable stream */
const readable = fs.createReadStream("./stream/import.csv", {
    highWaterMark: 40, // max byte a chunk
});

let chunkCount = 0;
readable.on("data", (chunk) => {
    if (chunkCount === 5) { // read first 6 chunk
        readable.pause(); // then pause 
        setTimeout(() => { // after 2s resume read file
            readable.resume()
        }, 2000);
    }
    console.log("New chunk: ", chunk);
    chunkCount++

    // if use writableStream in this callback => maybe get backpressure 
})

readable.on("open", () => { console.info('Read stream start') });
readable.on("pause", () => { console.info('Read stream pause') });
readable.on("end", () => { console.info('Read stream end') });

/* Writable stream */
const writable = fs.createWriteStream("./stream/export.csv");

/* Duplex stream: both write and read */
import { Transform, pipeline } from "stream";
const upperCase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
})

/**
 * pipe:
 *  - very bad with memory leak
 *  - handle error kinda weird => have to handle after each pipe
 */
// readable.pipe(upperCase).pipe(writable);

/**
 * pipeline:
 *  - easier to use and handle error
 */
try {
    // The pipeline function expects a callback as a last parameter.
    // if don't use callback, we can use async/await
    pipeline(readable, upperCase, writable, () => console.log('This is the end of pipe line'))
    console.info('Pipe line accomplished')
} catch (error) {
    console.error('There\'s error in pipe line', error)
}