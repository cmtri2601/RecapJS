import { Transform } from 'stream';

class DummyEncode extends Transform {
  constructor(salt, options) {
    super(options);
    this.salt = salt;
  }

  // _transform (only in Transform) - not _write or _read
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      chunk[i] += this.salt;
    }

    // 2 way same

    // 1st
    // this.push(chunk);
    // callback();

    // 2nd - callback also can use to flush chunk
    callback(null, chunk);
  }

  _flush() {
    this.flush('This is the end of stream')
  }
}

const dumEnc = new DummyEncode(2);

process.stdin.pipe(dumEnc).pipe(process.stdout);
