const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

// define webpack plugins
const cleanDist = new CleanWebpackPlugin(['dist']);

const extractSass = new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[contenthash:12].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

const processHtml = new HtmlWebpackPlugin({
  template: './src/index.html',
  title: 'Simply process excel files',
});

const scriptExtension = new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: 'defer'
});

const mainConfig = {
  entry: {
    index: './src/index.js'
  },
  plugins: [
    cleanDist,
    new CopyWebpackPlugin([{
      from: './src/images/',
      to: 'images',
      toType: 'dir'
    }]),
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

const rendererConfig = {
  entry: {
    renderer: './src/renderer.js'
  },
  plugins: [
    extractSass,
    processHtml,
    scriptExtension
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
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  //not to mock __dirname and such node globals
  node: false,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'electron-renderer'
};

module.exports = {
  mainConfig,
  rendererConfig
};
