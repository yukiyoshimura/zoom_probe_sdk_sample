import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'ZoomDiagnostic',
      fileName: 'zoom-diagnostic',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        extend: true,
        globals: {}
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    copyPublicDir: true
  },
  publicDir: 'src/public'
});