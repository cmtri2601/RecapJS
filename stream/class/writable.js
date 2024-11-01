import { Writable } from 'stream';
class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  // _write is internal, and we cannot use it outside of the Writable class.
  _write(chunk, encoding, callback) {
      const formattedChunk  = this._writableState.objectMode === true ? JSON.stringify(chunk) : chunk;
      console.log(`Writing to stream: ${formattedChunk}`);
      callback(); // flushes the buffer and emits 'drain' event
    }
  }

const data = ['first element', 'second element', 'last element'];
console.log("length: ", data[0].length);
const writable = new MyWritable();

// We consume the writable stream with writable.write(). 
// That function returns a Boolean — true if there is a place for 
// more data in the buffer, and false if not.
writable.write(data[0]);
writable.write(data[1]);
writable.end(data[2]);
