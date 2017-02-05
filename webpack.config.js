const webpack = require('webpack');

const devMode = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    app: './src/client',
  },
  output: {
    path: 'dist/assets',
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'USER_SEARCH_OAUTH',
    ]),
  ],
  devServer: {
    contentBase: 'dist',
    inline: true,
    port: '3001',
    publicPath: '/assets',
    historyApiFallback: true,
  },
  devtool: devMode ? 'eval-source-map' : null,
};

module.exports = config;
