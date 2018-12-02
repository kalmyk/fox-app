var debug = process.env.NODE_ENV !== 'production';
var path = require('path');
//var webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '/lib'),
  entry: {
    app:['./App.js'],
  },
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
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
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
