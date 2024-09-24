// Handle event set cookie
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    const name = document.querySelector('#textName').value;
    const value = document.querySelector('#textValue').value;
    const expire = document.querySelector('#expire').value || 1;

    if ( name && value) {
        setCookie(name, value, expire);
    } else {
        alert('Please input name and value');
    }

    console.log('Cookie:', document.cookie);
})

// Handle event get cookie
const btnGet = document.querySelector('#btnGetCookie');
btnGet.addEventListener('click', () => {
    const name = document.querySelector('#textName').value;
    const value = document.querySelector('#textValue');
    if (name) {
        value.value = getCookie(name);
    } else {
        alert('Please input name');
    }
    console.log('Cookie:', document.cookie);
})

// Handle event delete cookie
const btnDelete = document.querySelector('#btnDelCookie');
btnDelete.addEventListener('click', () => {
    const name = document.querySelector('#textName').value;
    if (name) {
        deleteCookie(name);
    } else {
        alert('Please input name');
    }
    console.log('Cookie:', document.cookie);
})


// set cookie
const setCookie = (name, value, expire) => {
    // calc expire date
    const expireDate = new Date(new Date().getTime() + expire*24*60*60*1000);
    const expireStr = `expires=${expireDate.toUTCString()}`;

    // set cookie
    document.cookie = `${name}=${value}; expires=${expireStr}; path=/`;
}

// get cookie
const getCookie = (name) => {
    const cookie = document.cookie;
    const cookieArr = cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const [key, value] = cookieArr[i].split('=');
        if (key.trim() === name.trim()) {
            return value;
        }
    }
    alert('Cookie not found');
    return '';
}   


// delete cookie
const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=${new Date().toUTCString()}; path=/`;
}