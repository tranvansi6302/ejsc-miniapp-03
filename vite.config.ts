/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(dirname, './src'),
      'react': path.resolve(dirname, './node_modules/react'),
      'react-dom': path.resolve(dirname, './node_modules/react-dom')
    },
    dedupe: ['react', 'react-dom', 'zustand']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand'],
  },
  build: {
    chunkSizeWarningLimit: 1500
  }
});