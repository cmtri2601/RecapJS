// built-in lib
import fs from "fs";
import { Transform } from "stream";
import { pipeline } from "stream/promises";

// 3rd lib
import mongoose from "mongoose";
import csv from "csvtojson";

// project module
import { UserModel } from "./user.model.js";

const main = async () => {
  // handle connection event  
  const db = mongoose.connection;
  // console.log(db);
  // db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => { console.info('Connected to MongoDB'); });

  // Connect to mongodb
  await mongoose.connect('mongodb://root:example@localhost:27017/recap?authSource=admin');
  

  /* Readable stream */
  const readable = fs.createReadStream("./stream/import.csv", {
    highWaterMark: 50, // max byte a chunk
  });

  /* Buffer before insert db*/
  const xxx = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      debugger
      callback(null, chuck)
    }
  })

  /* Buffer before insert db*/
  const createBuffer = (size) => {
    let buffer = [];
    let count = 0;
    return new Transform({
      objectMode: true,
      // transform function property just exist on transform not in duplex, read, write stream
      // transform function quite like write function in writable stream
      transform(chunk, encoding, callback) {
        buffer.push(chunk);

        if (buffer.length >= size) {
          // this.push to push data to next consumer
          this.push(buffer);
          buffer = [];
        }

        // call back like a signal which indicates chuck is completely handle, and have to put after handle chunk
        callback();
      },
      // Flush function property ensures that all data that has been written to that stream is output,
      // including clearing any that may have been buffered.
      flush(callback) {
        if (buffer.length > 0) {
          this.push(buffer);
        }
        // call back like a signal which indicates chuck is completely handle, and have to put after handle chunk
        callback();
      }
    })
  }

  /* Transform */
  const saveUser = new Transform({
    objectMode: true,
    async transform(chunk, encoding, callback) {
      // insert one row each time
      // await UserModel.create(chunk);
      // ======> time: 0m9,142s, 0m9,113s, 0m8,815s
      
      // insert bulk
      // console.log('Buffer of each time (depend on argument put on createBuffer): ', chunk);
      await UserModel.bulkWrite(
        chunk.map(user => ({
          insertOne: {
            document: user,
          }
        }))
      )
      // ======> time (buffer 10): 2,379s, 2,450s, 2,540s
      // ======> time (buffer 100): 1,892s, 2,057s, 1,924s
      // ======> time (buffer 300): 1,892s, 2,057s, 1,924s
      // ======> time (buffer 500): 1,852s, 1,954s, 1,916s
      // ======> time (buffer 1000): 1,920s, 1,977s, 1,965s

      // end
      callback()
    }
  })

  try {
    await pipeline(
      readable,
      csv(
        { delimiter: ';'}, // parserParameters
        { objectMode: true } // streamOptions
      ),
      createBuffer(300), // create buffer for insert bulk
      saveUser,
    )
    
    console.log('Pine line accomplished');
    // exit immediately - because still listen to mongo
    process.exit(0); 
  
  } catch (error) {
    console.error('There\'s error with pipe line ', error)
  }
}

// time node stream/node/mongo-bulk.js -> check time
main();