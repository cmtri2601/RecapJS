// use lodash through bundle (using webpack)
import _ from "lodash";

// import css to create create reference map
// use loader (css-loader and style-loader) to bundle (using webpack)
import style from '../style.css'

import component from './component.js';
document.body.append(component());

export default _; 