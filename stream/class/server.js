import {createServer} from 'http';
import {stat, createReadStream, createWriteStream} from 'fs';
import {promisify} from 'util';
import multiparty from 'multiparty';

const filename = './stream/class/anime_dancing.mp4';
const fileInfo = promisify(stat);

const server = createServer(async (req, res) => {
  switch (req.url) {

    // URL = /send-file
    case '/send-file':
      // method POST
      if (req.method === "POST") {
        // set event
        let form = new multiparty.Form();
        form.on('part', (part) =>{
          part
            .pipe(createWriteStream(`./stream/class/copy/${part.filename}`))
            .on('close', () => {
              res.writeHead(200, { 'Content-Type': 'text/html'});
              res.end(`<h1>File Uploaded: ${part.filename}</h1>`)
            })
        })

        // parse
        form.parse(req);
      // method GET
      } else {
        res.writeHead(200, {'content-type': 'text/html'})
        createNav(res);
        res.end(`
          <form enctype="multipart/form-data" method="POST" action="/send-file">
            <input type="file" name="upload-file" />
            <button>Upload File</button>
          </form>  
        `)
      }
      break;
    
    // URL = /send-file
    case '/video':
      const {size} = await fileInfo(filename); 
      const range = req.headers.range;
      // in case user choose range want to watch
      if(range){
        let [start, end] = range.replace(/bytes=/, '').split('-');
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size-1;

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': (start-end) + 1,
          'Content-Type': 'video/mp4'
        })

        createReadStream(filename, {start, end}).pipe(res);
      }else{
        res.writeHead(200, {
          'Content-Length': size,
          'Content-Type': 'video/mp4'
        });  
        createReadStream(filename).pipe(res);
      }
      break;
  
    // URL = other...
    default:
      res.writeHead(200, { 'Content-Type': 'text/html' });
      createNav(res);
      res.write(`<h1>This is the main page</h1>`)
      createNav(res);
      res.end();
      break;
  }
})

server.listen(3000, () => console.log('stream - http://localhost:3000'))

/**
 * create nav links
 * 
 * @param {*} res 
 */
const createNav = (res) => {
  res.write(`<a href="/">Main page</a><br>`);
  res.write(`<a href="/video">Watch video</a><br>`);
  res.write(`<a href="/send-file">Send file</a><br>`);
}
