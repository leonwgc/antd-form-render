const { run, build } = require('packrs');
const argv = require('yargs').argv;

const doc = argv.doc;
const isDev = !doc;

(isDev ? run : build)({
  index: `./demo/index`,
  dist: isDev ? './.dev' : './docs',
  port: 9001,
  rsConfig: {
    html: {
      title: 'antd-form-render',
    },
    output: {
      assetPrefix: './',
    },
  },
});
