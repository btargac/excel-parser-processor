const path = require("path");
const processType = process.env.PROCESS_TYPE;

const configPath = `webpack.${processType === 'main' ? 'main' : 'renderer'}.js`;

module.exports = {
  extends: path.resolve(__dirname, configPath),
  mode: 'production'
};
