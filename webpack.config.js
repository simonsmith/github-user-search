const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
      'NODE_ENV',
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',

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
      new webpack.EnvironmentPlugin([
        'USER_SEARCH_OAUTH',
      ]),
    ],
  });
}


if (NODE_ENV === 'production') {
  module.exports = merge(baseConfig, {
    output: {
      path: path.join(process.cwd(), 'build'),
      filename: '[name].bundle.[chunkhash].js',
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
      new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: true,
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new CleanWebpackPlugin(['build']),
    ],
  });
}
