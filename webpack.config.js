const webpack = require('webpack');
const path = require('path');
const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ManifestPlugin = require("webpack-manifest-plugin")
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


// default plugins, adapt later dependant on development or production mode
const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? "[name].css" : "[name].[contenthash].css",
    chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
  }),
];
// only development mode
if ( devMode ) {
  plugins.push(new webpack.HotModuleReplacementPlugin(), new WebpackManifestPlugin({ publicPath: "" }));
}


// default config, adapt later dependant on development or production mode
let config = {
  // entry: path.resolve(__dirname, './src/index.js'),
  // -1
  // one entry point for all, e.g. use in dev mode
  entry: [ path.resolve( __dirname, './src/js/vendor.js' ), path.resolve( __dirname, './src/js/index.js' ), path.resolve( __dirname, './src/scss/style.scss' ) ],
  // -1
  // multiple entry points for separated output files, e.g use on prod mode
  // entry: {
  //   vendor: path.resolve( __dirname, './src/js/vendor.js' ),
  //   main: path.resolve( __dirname, './src/js/index.js' ),
  //   style: path.resolve( __dirname, './src/scss/style.scss' ),
  // },
  mode: ! devMode ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [
          //MiniCssExtractPlugin.loader, 
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', 
          //'postcss-loader',
          'sass-loader'
        ],
      },
    ]
  },
  plugins,
  resolve: {
    extensions: [ '*', '.js' ]
  },
  output: {
    path: path.resolve( __dirname, './public' ),
    // -1
    // one output for all, e.g. use in dev mode
    filename: 'bundle.js',
    // path: path.join(__dirname, 'public', 'scripts'),
    // -1
    // multiple output files, e.g use on prod mode
    // filename: '[name].js',
  },
  
};
// only development mode
if ( devMode ) {
  config.devServer = {
    static: path.resolve(__dirname, './public'),
    hot: true,
    // contentBase: path.join(__dirname, "public"),
    // publicPath: 'http://localhost:8080/scripts/',
    // port: 8080,
    historyApiFallback: true,
  };
}


module.exports = config;