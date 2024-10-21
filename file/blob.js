/*
new Blob([ data ], {type:"text/plain", endings: "transparent"||"native"})
new File([ data ], filename, {type:"text/plain", lastModified: Date.now()})
(data - Blob, ArrayBuffer, TypedArray, DataView, String (utf-8 string), a mixture)

File is a SUB-CLASS of Blob (Binary large object). Can often be used interchangeably. 

Once you have a Blob/File then you can use it:
- upload via fetch as a file or stream
- save it in the cache
- add a link in a webpage to the file
- display it as an image (if image)
- read the text contents (json, txt, html...) and:
  - display on page
  - parse the html, xml, json, etc
  - save in localStorage or cookie

ArrayBuffer - raw data as a fixed-length string of bytes. It is NOT an Array.
(ArrayBuffer is there to give efficient and fast access to binary data, such 
as data that is needed by WebGL, Canvas 2D or Web Audio. In these instances, 
you generally want to store data in a way that is most efficiently consumed 
by your hardware or most easily streamed over the network.)

DataView - an interpretation of some raw bytes expressed as 8-bit, 16-bit, 32-bit,
  or 64-bit integers. Used to add or edit data in an ArrayBuffer. Like a wrapper 
  for ArrayBuffers if you need to edit them. It is a View of the Data from the ArrayBuffer

TypedArrays - It is an Array-like view of raw bytes stored as 
  8-bit, 16-bit, 32-bit or 64-bit  integers, clamped integers, 
  signed and unsigned integers, or floats. 

Arraybuffer ----handle by-----> DataView + TypedArrays
TypedArray, a view into an ArrayBuffer where every item has 
the same size and type. The DataView, another view into an ArrayBuffer, 
but one which allows items of different size and type in the ArrayBuffer.
*/

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', createBlob);
})

function createBlob(e) {
    e.preventDefault();

    // array buffer is not array, it's a raw data as a fixed-length string of bytes
    const firstBuffer = new ArrayBuffer(2);
    const secondBuffer = new ArrayBuffer(2);

    // handling array buffer by dataview
    const dataview = new DataView(firstBuffer);
    dataview.setInt8(0, 104);
    dataview.setInt8(1, 105);

    // handling array buffer by typed arrays
    // typed arrays are array-like view of raw bytes stored as 8-bit, 16-bit, 32-bit or 64-bit integers
    // typed arrays are not array, but they array-like meaning they have many similar methods of array
    const uint8Array = new Uint8Array(secondBuffer);
    uint8Array[0] = 106;
    uint8Array[1] = 107;

    // create blob (binary large object) from array buffer
    const firstBlob = new Blob([firstBuffer], {type: 'text/plain'});
    const secondBlob = new Blob([secondBuffer], {type: 'text/plain'});

    // create file from array buffer
    const firstFile = new File([firstBuffer], 'first.txt', {type: 'text/plain', lastModified: Date.now()});
    const secondFile = new File([secondBuffer], 'second.txt', {type: 'text/plain', lastModified: Date.now()});

    console.log('firstBlob: ', firstBlob);
    console.log('secondBlob: ', secondBlob);
    console.log('firstFile: ', firstFile);
    console.log('secondFile: ', secondFile);

    // read the text contents of the file
    const reader = new FileReader();
    // handle event 'loadend', there are several other event of FileReader: abort, error, load, loadend, loadstart, progress
    reader.onloadend = function() {
        console.log('firstFile text: ', reader.result);
    }
    reader.readAsText(firstFile); //  convert file to text
    // reader.readAsDataURL(firstFile); //convert file to base64 string - use case: image file

    // display file as a link
    const url = URL.createObjectURL(firstFile); //create path to a object that store in browser
    const a = document.createElement('a');
    a.href = url;
    a.download = firstFile.name;
    a.text = `Download ${firstFile.name}`;
    document.querySelector('body').append(a);
}   