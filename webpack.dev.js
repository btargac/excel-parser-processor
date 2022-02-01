const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { mainConfig, rendererConfig } = require('./webpack.common.js');
const processType = process.env.PROCESS_TYPE;

let config = null;

switch (processType) {
  case "main":
    config = mainConfig;
    break;
  case "renderer":
    config = rendererConfig;
}

module.exports = merge(config, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    injectHot: (compilerConfig) => compilerConfig.name === 'renderer'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ],
  mode: 'development',
  watch: true
});
