const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

// define webpack plugins
const extractSass = new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[contenthash:12].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

const processHtml = new HtmlWebpackPlugin({
  meta: {
    'Content-Security-Policy':
      {
        'http-equiv': 'Content-Security-Policy',
        content: `default-src 'self' ${devMode ? "'unsafe-eval'": ''}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;`
      }
  },
  hash: true,
  template: './src/index.html',
  title: 'Simply process Excel files',
});

const rendererConfig = {
  name: 'renderer',
  entry: {
    renderer: './src/renderer.js'
  },
  plugins: [
    ...(devMode ? [] : [extractSass]),
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
  target: ['web', 'electron-renderer']
};

module.exports = rendererConfig
