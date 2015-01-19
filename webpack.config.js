var webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/react/components/app.jsx'
  },
  output: {
    path: './built',
    filename: '[name].js',
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
      {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM'},
      {test: /\.js$|\.jsx/, exclude: /node_modules/, loader: "6to5-loader"}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
