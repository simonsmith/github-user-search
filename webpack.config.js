module.exports = {
  entry: {
    app: './app/react/components/app.jsx'
  },
  output: {
    path: './built',
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'app/react'
    ]
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM'},
      {test: /\.js$/, exclude: /node_modules/, loader: "6to5-loader"}
    ]
  }
};
