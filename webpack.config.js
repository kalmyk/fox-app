var debug = process.env.NODE_ENV !== 'production';
var path = require('path');
//var webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '/lib'),
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/www'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: debug ? 'inline-source-map' : null,
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-1']
          }
        }
      } /* ,
      { test: /\.css$/, use: { loader: 'style!css' }},
      { test: /\.jpg$/, use: { loader: "file-loader" }},
      { test: /\.png$/, use: { loader: "url-loader?mimetype=image/png" }},
      { test: /autobahn\/package.json$/, use: {loader: 'json-loader'}} */
    ]
  }
};
