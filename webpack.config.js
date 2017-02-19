const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const {NODE_ENV} = process.env;

const baseConfig = {
  entry: {
    app: './src/client',
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
      'USER_SEARCH_OAUTH',
      'NODE_ENV',
    ]),
  ],
};

if (NODE_ENV !== 'production') {
  module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',

    output: {
      path: path.join(process.cwd(), 'build'),
      filename: '[name].bundle.js',
    },

    devServer: {
      inline: true,
      contentBase: 'src',
      port: '3001',
      publicPath: '/',
      historyApiFallback: true,
    },

    module: {
      rules: [
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
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
  });
}
