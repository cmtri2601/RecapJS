/**
 * flowing stream
 * non-flowing (or pause) stream 
 */

import fs from 'fs';

const readStream = fs.createReadStream('./stream/class/anime_dancing.mp4');

// the consumption event data => make stream become flowing mode
readStream.on('data', (chunk) => {
  console.log("From data event:", chunk.length);
})

readStream.on('end', () => {
  console.log("read stream ended");
  // terminate process when file close
  process.exit();

})

readStream.on('error', (err) => {
  console.log("an err has occured");
  console.error(err);
})

// the pause method => make stream become non-flowing (pause) mode
readStream.pause();

// => read data base on signal from stdin
process.stdin.on('data', (chunkFromStdIn) => {
  if(chunkFromStdIn.toString().trim() === 'finish'){
    readStream.resume();
  }

   // closed property to determine file is ended
  if (readStream.closed) {
    process.exit()
  }

  const chunkFromFile = readStream.read();
  console.log("From read method:", chunkFromFile.length);
})