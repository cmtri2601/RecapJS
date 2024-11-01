/**
 * Reading files with Node.js
 * 
 * Node.js provides a module called fs for file system operations.
 * 
 * All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() read the full content of the file in memory before returning the data.
 * This means that big files are going to have a major impact on your memory consumption and speed of execution of the program.
 * In this case, a better option is to read the file content using STREAMS. (stream.js file)
 */


 /**
  * When the fs module was first created, 
  * the primary way to write asynchronous code in Node.js was through callbacks. 
  * As promises grew in popularity, the Node.js team worked to support them in 
  * the fs module out of the box. In Node.js version 10, they created a promises 
  * object in the fs module that uses promises, while the main fs module continues 
  * to expose functions that use callbacks. 
  * 
  * In this file, we are importing the promise version of the module.
  */
import fs from 'fs/promises';

const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf-8');
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

const openFile = async () => {
    try {
        const csvHeaders = 'name, value';
        await fs.writeFile('file/map.csv', csvHeaders);
    } catch (error) {
        console.error(error);
    }
}

const appendFile = async (name, value) => {
    try {
        const csvRow = `\n${name}, ${value}`;
        await fs.appendFile('file/map.csv', csvRow, { flag: 'a' });
    } catch (error) {
        console.error(error);
    }
}

// delete, move ... file

readFile('./ajax-file.txt');
openFile();
appendFile('John', 100);
appendFile('Jane', 200);
readFile('map.csv');