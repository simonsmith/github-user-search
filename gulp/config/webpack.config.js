var paths = require('../util/paths');

module.exports = {
  entry: {
    app: './app/react/components/app.jsx'
  },
  output: {
    path: paths.js.dest,
    filename: '[name].built.js',
    sourceMapFilename: '[file].map'
  },
  devtool: 'source-map',
  resolve: {
    modulesDirectories: [
      'node_modules',
      'app/react'
    ]
  },
  module: {
    loaders: [
      {test: /\.js$|\.jsx/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
