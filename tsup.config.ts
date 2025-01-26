import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
  external: ['react', 'react-dom', 'antd'],
});
