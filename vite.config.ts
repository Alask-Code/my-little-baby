import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { join } from 'path';

const root = __dirname;
const srcRoot = join(__dirname, 'src');

export default defineConfig({
  root,
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': srcRoot,
      '/@': srcRoot
    }
  },
  build: {
    outDir: join(root, 'dist'),
    emptyOutDir: true,
    rollupOptions: { external: [''] }
  },
  server: {
    port: 3000
  }
});
