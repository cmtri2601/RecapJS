import { createWriteStream } from 'fs';

const writeStream = createWriteStream('./stream/class/pipe.txt');
process.stdin.pipe(writeStream);
process.stdin.on('end', () => {
  writeStream.close()
})

// can use pipe with echo to this script
/* 
echo "hello world" | node stream/class/pipe.js
cat stream/class/pipe.js | node stream/class/pipe.js
*/