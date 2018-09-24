module.exports = {
  mode: 'development',
  entry: './app/App.js',
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
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /autobahn\/package.json$/, loader: 'json-loader'}
    ]
  }
};
