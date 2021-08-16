/* eslint-disable @typescript-eslint/no-var-requires */
const { default: pack } = require('packx');
const path = require('path');

pack(true, {
  entry: {
    index: `./demo/index`,
  },
  devServer: {
    port: 9200,
  },
  resolve: {
    alias: {
      'antd-form-render': path.resolve(__dirname, './src'),
    },
  },
});
