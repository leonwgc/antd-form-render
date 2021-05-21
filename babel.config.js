module.exports = (api) => {
  api.cache.using(() => process.env.TARGET);

  const rt = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      ['@babel/preset-react'],
      ['@babel/preset-typescript'],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
    ].filter(Boolean),
  };

  return rt;
};
