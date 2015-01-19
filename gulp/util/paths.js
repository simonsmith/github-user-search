var path = require('path');

var cssDir = path.resolve('./app/suit');
var jsDir = path.resolve('./app/react');

var paths = {
  css: {
    cssDir: cssDir,
    dest: path.resolve('./built'),
    mainFile: 'app.css',
    builtFile: 'app.built.css'
  },
  js: {
    jsDir: jsDir,
    dest: path.resolve('./built'),
    src: path.join(jsDir + '/app.jsx')
  }
};

module.exports = paths;
