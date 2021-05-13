module.exports = (api) => {
  api.cache.using(() => process.env.TARGET);

  const target = process.env.TARGET || 'cjs';

  const rt = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: target === 'mjs' ? false : 'cjs',
        },
      ],
      ['@babel/preset-react'],
      ['@babel/preset-typescript'],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      ['@babel/plugin-transform-runtime'],
    ].filter(Boolean),
  };

  return rt;
};
