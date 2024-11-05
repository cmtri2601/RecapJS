import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  /*
    2 case for "mode": 
      - development: quickly redo, use sort mapping to trace down the error
      - production: minimize, compress 
  */
  mode: 'production', // development
  
  // where root js file - can have multiple file
  entry: {
    main: './src/index.js' // Your entry point
  },
  // where the final bundle file is
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // name - in this case is main, we also have contenthash to manage version
    clean: true, // clear bundle file in previous time
    assetModuleFilename: '[name][ext]', // keep file name of asset
  },
  

  /* 
  ------------------------- This is enough for basic -------------------------- 
  Simple step to visualize process of webpack bundling:
    1. find the entry file and load its contents into memory
    2. match certain text within the content and evaluate those (for e.g. @import)
    3. find the dependencies based on previous evaluation and do the same with them
    4. stitch them all into a bundle in memory
    5. write the results to file system
  (Ref: https://stackoverflow.com/questions/37452402/webpack-loaders-vs-plugins-whats-the-difference)

  Other things: 
    - Loaders: (typically running in steps 1 - 3)
      + Webpack by default understand .json, .js
      + Webpack don't understand .ts, .html, .css, .sass, .image, .csv 
      => loaders turn all file that webpack can't handle to module
      that can be imported by js

      + Since the stage at which these loaders need to run is obvious, they don't require hooks and neither do they influence 
      the build process(since the build or bundle only happens at step 4).
      + So Loaders PREPARE THE STAGE FOR COMPILATION and they sort of extend the flexibility of the webpack compiler.
      + Simpler than plugin as they
        * expose only one single function to webpack
        * not able to influence the actual build process.

    - Plugins: (typically running in steps 4 - 5)
      + Webpack just bundle the source and don't want to change to output but some people want it so webpack need extensions
      to change handle the alternation at the output.
      + Plugins therefore INFLUENCE THE OUTPUT and sort of extend the capability of webpack compiler. 
      + Deeply integrate into webpack because they can register hooks within webpack build system and access (and modify) the compiler,
      + More powerful, but also harder to maintain.
  */ 
  // loaders <=> module.rules <=> array of object (loaders)
  module: {
    rules: [
      // css
      {
        // file extension
        test: /\.css$/, 
        // exclude: ... // exclude folder (node_module)
        // loaders (read in order from right to left - css loader => style-loader)
        use: ['style-loader', 'css-loader']
      },

      // image
      //build-in loader of webpack v5
      {
        test: /\.(svg|icon|png|jpg|jpeg|gif)$/, 
        type: 'asset/resource'
      }

      // js for babel - Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript that can run in any browser.
      // Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Here are the main things Babel can do for you: Transform syntax.
    ]
  },
  
  // plugins - array of function
  plugins: [
    new HtmlWebpackPlugin({
      title: 'This is from HtmlWebpackPlugin',
      filename: 'index.html',
      // if want to create html file base on temple
      template: path.resolve(__dirname, "index.html"), 
    })
  ],

  // dev server
  devtool: "inline-source-map", // to keep track all module came from
  devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 5001, // default 8080
      open: true, // launch the browser when start 
      hot: true, // hot module replacement
      
      // compress: true,
  },
};

export default config;