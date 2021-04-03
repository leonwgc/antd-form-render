const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBar = require('webpackbar');
const argv = require('yargs').argv;

const isDev = argv.dev;
const isProd = argv.build;
const port = 9004;

const getHtmlTpl = require('./tpl');

const entry = './demo/index';

const output = {
  path: getPath('./dist'),
  chunkFilename: `[name].js`,
  filename: '[name].js',
};

const resolveAlias = {
  '~': path.resolve(__dirname, './src'),
};

const htmlsPlugins = [];

htmlsPlugins.push(
  new HtmlWebpackPlugin(
    Object.assign({
      filename: `index.html`,
      templateContent: ({ htmlWebpackPlugin }) => getHtmlTpl(htmlWebpackPlugin, 'demo'),
      inject: false,
      hash: false,
    })
  )
);

function getStyleLoaders(useCss = false) {
  const loaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          sourceMap: isDev,
        },
      },
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: isDev,
        javascriptEnabled: true,
      },
    },
  ];
  if (useCss) {
    loaders.pop();
  }
  loaders.unshift({
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev,
      reloadAll: true,
    },
  });
  if (isDev) {
    loaders.shift();
    loaders.unshift({ loader: 'style-loader' });
  }
  return loaders;
}

function getPath(_path) {
  return path.resolve(__dirname, _path);
}

const config = {
  mode: isDev ? 'development' : 'production',
  bail: !isDev,
  entry,
  output,
  devtool: isDev ? 'cheap-module-source-map' : false,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.less$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(true),
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: isProd ? 10000 : 1,
            name: './images/[name].[contenthash:6].[ext]',
          },
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: './fonts/[name].[ext]',
            limit: 8192,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: resolveAlias,
  },
  externals: isProd
    ? {
        'react': 'react',
        'react-dom': 'react-dom',
        'antd': 'antd',
      }
    : {},
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash:6].css`,
      chunkFilename: `[name].[contenthash:6].css`,
    }),
    new webpack.DefinePlugin({
      __client__: true,
      __dev__: isDev,
    }),
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 20,
    }),
    new WebpackBar(),
    ...htmlsPlugins,
  ],
};

if (isDev) {
  config.stats = 'errors-warnings';

  config.devServer = {
    disableHostCheck: true,
    contentBase: getPath('./dist'),
    host: '127.0.0.1',
    port,
    hot: true,
    inline: true,
    historyApiFallback: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
  };
  console.log(chalk.green(`开发地址:http://localhost:${port}`));
} else {
  config.stats = 'errors-only';
  config.plugins.push(new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { safe: true } }));
}

module.exports = config;
