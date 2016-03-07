var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './source/client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'source'),
      query: {
        presets: ['es2015', 'stage-2', 'react']
      }
    }]
  }
};
