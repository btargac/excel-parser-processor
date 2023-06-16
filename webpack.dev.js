const path = require('path');
const processType = process.env.PROCESS_TYPE;

const configPath = `webpack.${processType === 'main' ? 'main' : 'renderer'}.js`;

module.exports = {
  extends: path.resolve(__dirname, configPath),
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true
  },
  mode: 'development'
};
