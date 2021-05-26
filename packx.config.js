const path = require('path');

module.exports = {
  entry: {
    index: './demo/index',
  },
  devServer: {
    port: 3000,
  },
  output: {
    path: path.resolve(__dirname, './dist/packx-demo'),
  },
};
