// using asset/resource loaders build-in webpack 5
import logo from '../network/OSI_Model_1.jpg'

function component() {
  let m = document.createElement('main');
  let p = document.createElement('p');

  let label = document.createElement('h3');
  label.innerHTML = 'This is a mimic component of react'
  
  let text = document.createElement('p');
  text.innerHTML = 'Using webpack dev server to \"hot module replacement\"'

  let img = document.createElement('img');

  m.append(p);
  p.append(label);
  p.append(text);
  p.append(img);
  img.src = logo;
  img.alt = 'logo';
  img.width = 300;

  return m;
}

export default component;