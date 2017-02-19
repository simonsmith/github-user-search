const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(process.cwd(), './src/client'),
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
            },
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
