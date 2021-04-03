module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const rt = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          },
        },
      ],
      ['@babel/preset-react'],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      ['@babel/plugin-transform-runtime'],
    ].filter(Boolean),
  };

  return rt;
};
