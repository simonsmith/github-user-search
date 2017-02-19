const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    app: './src/client',
  },
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].bundle.js',
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
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'USER_SEARCH_OAUTH',
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devServer: {
    inline: true,
    contentBase: 'src',
    port: '3001',
    publicPath: '/',
    historyApiFallback: true,
  },
  devtool: devMode ? 'eval-source-map' : null,
};

module.exports = config;
