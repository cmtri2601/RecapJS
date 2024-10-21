const url = 'https://jsonplaceholder.typicode.com/users';
const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#file').addEventListener('change', onChangeFile);
    document.querySelector('#files').addEventListener('change', onChangeFiles);
    document.querySelector('#btn').addEventListener('click', upload);
})

// apply closure to store file (encapsulate private value)
const fileStorage = () => {
    let file;
    let files;
    let imageNode;

    const changeFile = (input) => {
        // validate before change
        if (!input) {
            file = null;
        }   
        else if (input[0] instanceof Blob) {
            file = input[0];
        }
    }

    const getFile = () => file;

    const changeFiles = (input) => {
        // validate before change
        if (!input) {
            file = null;
        }
        else if (Array.prototype.every.call(input, x => x instanceof Blob)) {
            files = input;
        }
    }

    const getFiles = () => files;

    const setImageNode = (node) => { imageNode = node};

    const getImageNode = () => imageNode;

    // expose public methods
    return {
        changeFile,
        getFile,
        changeFiles,
        getFiles,
        setImageNode,
        getImageNode
    }
}

// create closure
const storage = fileStorage();

// handle changing file element
function onChangeFile(e) {
    e.preventDefault();
    
    const files = showFileInfo(e);
    storage.changeFile(files);

    // show preview image
    const file = storage.getFile();
    if (file && file instanceof Blob && acceptedImageTypes.includes(file.type)) {
        // create url from obj
        const objURL = URL.createObjectURL(file);
        
        // create image element
        const img = document.createElement('img');
        img.src = objURL;
        img.height = 300;
        img.width = 300;

        // check existing image and add to dom
        const existImage = storage.getImageNode();
        if (existImage) {
            existImage.remove();
        }
        document.querySelector('body').append(img);

        // set value to storage
        storage.setImageNode(img);
    }
}

// handle changing files element
function onChangeFiles(e) {
    e.preventDefault();
    
    const files = showFileInfo(e);
    storage.changeFiles(files);
}

// upload files
const upload = () => {
    uploadFile(storage.getFile());
    uploadFiles(storage.getFiles());
}

// upload single file
const uploadFile = (file) => {
    if (!file) return;

    const header = new Headers();
    header.append('content-type', file.type);
    header.append('content-size', file.length);

    const req = new Request(url, {
        body: file,
        header: header,
        mode: 'no-cors', //default mode of browser is cors but server is allow => set no-cors at request
        method: 'POST'
    })

    fetch(req)
        .then(res => console.log('Send file successfully'))
        .catch(console.warn);
}

// upload multiple file
const uploadFiles = (files) => {
    if (!files) return;

    // we can't put multiple files to body (like upload 1 file)
    // => we need use FormData
    const form = new FormData();
    for (const file in files) {
        form.append(file.name, file);
    }

    const req = new Request(url, {
        body: form,
        // header: header, // don't need header anymore, data form auto set
        mode: 'no-cors', //default mode of browser is cors but server is allow => set no-cors at request
        method: 'POST'
    })

    fetch(req)
        .then(res => console.log('Send files successfully'))
        .catch(console.warn);
}

// show files information and get files value
const showFileInfo = (e) => {
    files = e.target.files;

    if (!files.length) return null;

    for (file of files) {
        console.group();
        console.log(file.name);
        console.log(file.size);
        console.log(file.lastModifiedDate);
        console.log(file.type);
        console.groupEnd();
    }

    return files;
}