var debug = process.env.NODE_ENV !== 'production'
var path = require('path')
// var webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '/main'),
  entry: ['./appmain'],
  output: {
    filename: 'bundle.js',
    path: path.join(path.dirname(__dirname), '/resources')
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.jsx']
  },
  devtool: debug ? 'inline-source-map' : null,
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-1']
          }
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] } /*,
      { test: /\.jpg$/, use: { loader: "file-loader" } },
      { test: /\.png$/, use: { loader: "url-loader?mimetype=image/png" } },
      { test: /autobahn\/package.json$/, use: {loader: 'json-loader'} } */
    ]
  }
};
