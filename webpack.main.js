const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

const devMode = process.env.NODE_ENV === 'development';

// define webpack plugins
const cleanDist = new CleanWebpackPlugin();

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
    ...(devMode ? [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })] : []
    )
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
  target: 'electron-main',
  watch: devMode
};

module.exports = mainConfig
