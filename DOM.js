
const handleAddElement = () => {
    const name = document.querySelector('#textName').value;
    const para = document.createElement('p');
    const box = document.querySelector('.box');
    prePara = box.querySelector('#temp-para');
    let node;

    // set text
    if (name) {
        node = document.createTextNode(`${name} - this adding text came from name`);
    } else {
        node = document.createTextNode(`There is no name to add`);
    }

    // create element
    para.appendChild(node);
    para.setAttribute('id', 'temp-para');
    
    // check if there is a previous para
    if (prePara) {
        box.removeChild(prePara);
    }
    
    // append to box
    box.appendChild(para);

    // remove after 1 second
    setTimeout(() => {
        box.removeChild(para);
    }, 3000);
}

const btn = document.querySelector('#btnAddElement');
btn.onclick = handleAddElement;