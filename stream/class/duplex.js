import {Duplex, PassThrough} from 'stream';
import {createReadStream, createWriteStream} from 'fs';
const readStream = createReadStream('./stream/class/anime_dancing.mp4');
const writeStream = createWriteStream('./stream/class/copy.mp4');

// Duplex class need to implement 2 method _read and _write
class Throttle extends Duplex {

  constructor(ms) {
    super();
    this.delay = ms;
  }

  // just get data from other readable stream => don't need to implement
  _read() {}

  // implement throttle when emit data
  _write(chunk, encoding, callback) {
    this.push(chunk);

    // create throttle here
    setTimeout(callback, this.delay);
  }

  _final(){
    this.push(null)
  }
}

const report = new PassThrough();
const throttle = new Throttle(200);

let total = 0;
report.on('data', (chunk) => {
  total += chunk.length;
  console.log('bytes: ', total);
})

readStream.pipe(throttle).pipe(report).pipe(writeStream);