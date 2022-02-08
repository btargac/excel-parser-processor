const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

// define webpack plugins
const cleanDist = new CleanWebpackPlugin();

const extractSass = new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[contenthash:12].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

const processHtml = new HtmlWebpackPlugin({
  template: './src/index.html',
  title: 'Simply process Excel files',
});

const mainConfig = {
  name: 'main',
  entry: {
    index: './src/index.js'
  },
  plugins: [
    cleanDist,
    new CopyPlugin({
      patterns: [
        {
          from: './src/images/',
          to: 'images'
        },
        {
          from: './src/preload.js',
          to: 'preload.js',
          toType: 'file'
        }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            'cacheDirectory': true,
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
  name: 'renderer',
  entry: {
    renderer: './src/renderer.js'
  },
  plugins: [
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
            'cacheDirectory': true,
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
