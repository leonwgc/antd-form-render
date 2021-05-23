const path = require('path');

module.exports = {
  entry: {
    index: './demo/index',
  },
  output: {
    path: path.resolve(__dirname, './demo-dist'),
  },
  devServer: {
    port: 3000,
  },
};
