const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].bundle.[chunkhash].js',
    publicPath: '/github-user-search/',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    // Clear out `build` directory between builds
    new CleanWebpackPlugin(['build']),
    // Extract imported CSS into own file
    new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: true,
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});
