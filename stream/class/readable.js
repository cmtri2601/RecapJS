import { Readable } from 'stream';
class MyReadable extends Readable {
  constructor(data, options) {
    super(options);
    this.data = data;
  }
  
  /**
   * read is a private method, that only the Readable class can use. 
   * We have to implement it, but we cannot use it.} size 
   * @private
   * @param {number} size (highWaterMark) - The number of bytes to read from the stream.
   * 
   * Readable have another read (not _read) method that is used by consumer
   */
  _read(size) {
    if (this.data.length) {
      const chunk = this.data.slice(0, size);
      this.data = this.data.slice(size, this.data.length); 
      /*
       * The push will fill the buffer with the data and will trigger 
       * the readable stream to emit a ‘readable’ event, in order to let 
       * its listeners know that there is data that they can read.              
       */ 
      this.push(chunk);        
    } else {
      /*
       * When we finish reading all of the data we need to push ‘null’ 
       * to the buffer, and then an ‘end’ event will be emitted, and the 
       * listeners will get it, and stop listening.
       */ 
      this.push(null); // pull "null" value to indicate 'end' readable stream
    }
  }
}

const data = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }];

/*
 * stream can consume only data that is string, buffer or objects. 
 * in that example I chose objects. If we choose objects, we have 
 * to set objectMode to true. You can see that I limit the highWaterMark 
 * to 2. If you followed me, I mentioned before that the units of the 
 * highWaterMark property is KB — but not here, if we set the objectMode 
 * to true, then the units of the highWaterMark will be the number of the objects.
 */
const readable = new MyReadable(data, { objectMode: true, highWaterMark: 2 });


/*
 * Readable stream has three states and two modes.
 * 
 * readableFlowing property: current state (null, true, false)
 * mode: flowing mode and paused mode (2 way of consuming data)
 */ 

// At the beginning, in the init state, the readableFlowing will always be null, 
// because no mechanism for consuming the stream’s data is provided.
console.log(readable.readableFlowing); // null



// There 2 way of consuming data


// 1st way: flowing mode =>  can read as quickly as possible using event emitter
readable.on('data', chunk => {
  console.log('Read from data event: ', chunk);
});
console.log(readable.readableFlowing); // true - flowing


// 2nd way: paused mode => the stream.read() method must be called explicitly to 
// read chunks of data from the stream.
readable.on('readable', () => {
  let chunk;
  console.log('TEST')
  while (null !== (chunk = readable.read())) {
    console.log(`Read from readable event: `, chunk);
  }
});
console.log(readable.readableFlowing); // false -paused


// end
readable.on('end', () => console.log('No more data!'));


/*
  It’s important to remember that Readable will not generate data until a 
  mechanism for consuming or ignoring the data is provided.

  If a Readable is switched into flowing mode and it’s not consumed by anyone, 
  the data will be lost.
*/


/**
 * Ref: 
 *  - https://medium.com/autodesk-tlv/streams-in-depth-in-node-js-c8cc7f1eb0d6#f227
 */
