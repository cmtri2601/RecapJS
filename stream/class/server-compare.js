// ----------------- use Chrome Inspector to debug memory (Allocation time line) and cpu profile -------------------------
import http from 'http' ;
import fs from 'fs';
import fsPromise from 'fs/promises';

const file = './stream/class/big-file.text';

const largeStrings = [];
const largeNumbers = [];
const largeDates = [];

const server = http.createServer(async (req, res) => {
  
  // routing
  switch (req.url) {
    case "/file-without-stream":
      sendFileWithoutStream(req, res);
      break;

    case "/file-with-stream":
      sendFileWithStream(req, res);
      break;

    case "/long-heavy-task":
      handleLongHeavyTask(req, res);
      break;

    default:
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h1>This is the main page</h1>`)
      createNav(res);
      res.end();
      break;
  }
})

// listen to port
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server - http://localhost:${port}`));

/**
 * create nav links
 * 
 * @param {*} res 
 */
const createNav = (res) => {
  res.write(`<a href="/">Main page</a><br>`);
  res.write(`<a href="/file-without-stream">Load file without stream</a><br>`);
  res.write(`<a href="/file-with-stream">Load file with stream</a><br>`);
  res.write(`<a href="/long-heavy-task">Handle long heavy task</a><br>`);
}

/**
 * send file without stream
 * 
 * @param {*} req 
 * @param {*} res 
 */
const sendFileWithoutStream = async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  createNav(res);

  // consume file all at once => heap 246MB
  const content = await fsPromise.readFile(file);
  res.write(`<p>${content}</p>`);
  res.end();
}

/**
 * send file with stream
 * 
 * @param {*} req 
 * @param {*} res 
 */
const sendFileWithStream = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  createNav(res);

  // consume file as stream
  // consume file all at once => heap 5MB 
  const readableStream = fs.createReadStream(file);
  readableStream
    .pipe(res)
    .on('error', console.error)
}

/**
 * long heavy task
 * 
 * @param {*} req 
 * @param {*} res 
 */
const handleLongHeavyTask = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  createNav(res);

  for (let i = 0; i < 10_000; i++) {
    largeStrings.push("some data");
    largeNumbers.push(i);
    largeDates.push(new Date());
  }
  res.end("Done long heavy task.")
}