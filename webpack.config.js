module.exports = {
  mode: 'development',
  entry: {
    app:['./app/App.js'],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/www'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'source-map',
//  devtool: 'inline-source-map',

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
