/**
 * Streams API
 * 
 * The Streams API provides a standard way to work with streaming data in JavaScript. 
 * It allows you to process data chunk by chunk, making it efficient for handling large 
 * resources or real-time data in web applications. You should be aware of these key 
 * concepts in the Streams API:
 *      - Chunks: The data is read sequentially in pieces called chunks. A chunk can be one byte or something larger, like a typed array of a specific size. A single stream can have chunks of different sizes and types.
 *      - Backpressure: The API automatically manages backpressure, ensuring that fast producers don't overwhelm slow consumers. This is handled through internal queuing mechanisms.
 *      - Piping: The API provides methods like pipeThrough() and pipeTo() to connect streams, allowing for chained processing of data.
 * 
 * The API includes the following abstractions for different types of streams:
 *     - ReadableStream: Represents a source from which data can be read. It can be created from various sources like fetch responses or file inputs.
 *     - WritableStream: Represents a destination to which data can be written. It can be used for tasks like writing to files or sending data to client/server.
 *     - TransformStream: Allows modification of data as it passes from a readable stream to a writable stream. It's useful for tasks like compression or encryption.
 * 
 * Ref:
 *     - https://developer.mozilla.org/en-US/blog/efficient-data-handling-with-the-streams-api
 *     - https://developer.mozilla.org/en-US/docs/Web/API/Streams_API
 */

const file = './ajax-file.txt'

async function fetchAndTransformFile (file) {
    try {
        // ReadableStream
        const response = await fetch(file);
        const reader = response.body;
        
        const transformStream = createTransformStream();
        const writableStream = createWritableStream();

        // piping the streams
        await reader.pipeThrough(transformStream).pipeTo(writableStream);
    } catch (error) {
        console.error(error);
    }
}

function createTransformStream() {
    return new TransformStream({
        transform(chunk, controller) {
            // get data from internal queue
            const text = new TextDecoder().decode(chunk);
            const upperCaseChunk = text.toUpperCase();
            const transformedBuffer = new TextEncoder().encode(upperCaseChunk);
            // enqueue data for writable stream can read
            controller.enqueue(transformedBuffer);
        }
    })
}

function createWritableStream() {
    return new WritableStream({
        write(chunk) {
            const text = new TextDecoder().decode(chunk);
            console.log(text);
        }
    })
}

fetchAndTransformFile(file);