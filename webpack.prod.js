const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
  plugins: [
    new UglifyJSPlugin()
  ],
  mode: 'production'
});
