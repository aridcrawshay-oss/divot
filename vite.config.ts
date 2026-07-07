import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@game': path.resolve(__dirname, './src/game'),
      '@golf': path.resolve(__dirname, './src/golf'),
      '@render': path.resolve(__dirname, './src/render'),
      '@career': path.resolve(__dirname, './src/career'),
      '@data': path.resolve(__dirname, './src/data'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    target: 'ES2020',
    minify: 'terser',
  },
  server: {
    strictPort: true,
  },
});
