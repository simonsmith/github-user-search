var webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/components/app.jsx'
  },
  output: {
    path: './built',
    filename: '[name].built.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'app'
    ]
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM'}
    ]
  }
};
