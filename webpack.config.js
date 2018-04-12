module.exports = {
  entry: './app/app.js',
  output: {
    filename: 'bundle.js',
    path: './www',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
//  devtool: 'inline-source-map',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /autobahn\/package.json$/, loader: 'json-loader'}
    ]
  }
};
