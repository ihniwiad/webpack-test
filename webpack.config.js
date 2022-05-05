const path = require('path');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    // path: path.join(__dirname, 'public', 'scripts'),
    // filename: '[name].bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, './public'),
    hot: true,
    // contentBase: path.join(__dirname, "public"),
    // publicPath: 'http://localhost:8080/scripts/',
    // port: 8080,
    historyApiFallback: true,
  },
};