import { Duplex } from 'stream';

const inoutStream = new Duplex({
  // The readable and writable sides of a duplex stream operate completely independently from one another. 
  // This is merely a grouping of two features into an object.

  // ====> so we need: transform
  // A transform stream is the more interesting duplex stream because its output is computed from its input.

  // writable stream of duplex
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  // readable stream of duplex
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      // in readable stream, use this.push to move data to consumer
      this.push(null);
    }
  }
});

inoutStream.currentCharCode = 65;

process.stdin.pipe(inoutStream).pipe(process.stdout);