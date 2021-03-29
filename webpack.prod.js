const { merge } = require('webpack-merge');
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
  mode: 'production'
});
