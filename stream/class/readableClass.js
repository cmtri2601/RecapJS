import { Readable } from 'stream';

const advices = [
  "No ice for drinks? Use frozen vegetables.",
  "If you feel alone, watcha horror movie before going to be. You won't feel alone anymore.",
  "Don't have sex after chopping jalapeños",
  "If you can't blind them with brilliance, baffle them with nonsense",
  "Always borrow money from a pessimist, they won't expect it back"
];

class StreamFromArray extends Readable {
  // constructor(data, options) {
  //   super(options);
  //   this.data = data;
  // }

  constructor(array) {
    super({
      // if don't put encoding or object mode => read as buffer
      // encoding: 'UTF-8', // convert buffer to string
      objectMode: true, // convert buffer to object
    });

    this.array = array;
    this.index = 0;
  }

  /**
   * read is a private method, that only the Readable class can use. 
   * We have to implement it, but we cannot use it.} size 
   * @private
   * @param {number} size (highWaterMark) - The number of bytes to read from the stream.
   */
  _read(size) {
    if(this.index < this.array.length){
      // string of buffer mode
      // const chunk = this.array[this.index];
      // object mode
      const chunk = {
        data: this.array[this.index],
        index: this.index
      }
      // emit data to consumer
      this.push(chunk);
      this.index++;
    } else { 
      // stop stream
      this.push(null);
    }
  }
}

const adviceStream = new StreamFromArray(advices);

adviceStream.on('data', (chunk) => console.log(chunk));

adviceStream.on('end', () => console.log("done!"));

/**
 * Ref: 
 *  - https://www.youtube.com/watch?v=_pqv06ySvuk&list=PLrwNNiB6YOA18XANsFe0CnizlhYKjJT0f&index=2
 *  - https://stackoverflow.com/questions/62139978/what-are-the-roles-of-read-and-read-in-node-js-streams#:~:text=read()%20is%20something%20that,implementation%20of%20the%20read%20stream.
 */