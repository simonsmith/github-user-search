var webpack = require('webpack');

module.exports = {
  entry: {
    app: './react_components/app.jsx'
  },
  output: {
    path: './built',
    filename: '[name].built.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'react_components'
    ]
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM'}
    ]
  }
};
