import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.tsx'],
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: !options.watch,
  external: ['react', 'react-dom', 'antd'],
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
}));
