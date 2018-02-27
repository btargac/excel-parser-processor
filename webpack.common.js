const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// define webpack plugins
const cleanDist = new CleanWebpackPlugin(['dist']);

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash:12].css",
  disable: process.env.NODE_ENV === "development"
});

const processHtml = new HtmlWebpackPlugin({
  template: './src/index.html',
  title: 'Simply process excel files',
});

module.exports = {
  entry: {
    index: './src/index.js'
  },
  plugins: [
    cleanDist,
    // nothing to copy from src to dist yet
    // new CopyWebpackPlugin([]),
    extractSass,
    processHtml
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  //not to mock __dirname and such node globals
  node: false,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'electron-main'
};
