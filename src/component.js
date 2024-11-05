// using asset/resource loaders build-in webpack 5
import logo from '../network/OSI_Model_1.jpg'

function component() {
  let m = document.createElement('main');
  let p = document.createElement('p');
  let text = document.createElement('h3');
  text.innerHTML = 'TEXT change'
  let img = document.createElement('img');
  m.append(p);
  p.append(text);
  p.append(img);
  img.src = logo;
  img.alt = 'sample logo';
  img.width = 300;

  return m;
}

export default component;