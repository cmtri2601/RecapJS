/**
 * when amount of data read is overflow amount of data can write
 * to make sure memory leak no happen we need to handle backpressure
 *  */ 

// this file mimic how to handle backpressure
// we can use pipe to automatically handle backpressure

import {createReadStream, createWriteStream} from 'fs';

let pauseTime = 0;

const readStream = createReadStream('./stream/class/anime_dancing.mp4', {
  highWaterMark: 60 // amount of data each time read in KB ( default 64)
});
const writeStream = createWriteStream('./stream/class/copy.mp4', {
  highWaterMark: 20 // amount of data each time write in KB ( default 64)
});

readStream.on('data', (chunk) => {
  // return true/false mean can/can't receive more data
  const result = writeStream.write(chunk);

  if(!result) {
    console.log('backpressure: ', ++pauseTime);
    readStream.pause(); // stop reading when writable stream can't handle
  }
})

readStream.on('error', (err) => {
  console.log("An err has occured");
  console.error(err);
})

readStream.on('end', () => {
  writeStream.end();
})

// this event trigger when writable stream can receive more data
writeStream.on('drain', () => {
  console.log('drained');
  readStream.resume(); // resume reading
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n');
})