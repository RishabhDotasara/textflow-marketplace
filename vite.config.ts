import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import fs from 'fs';

// Dynamically find all action HTML files
const actionDirs = fs.existsSync(resolve(__dirname, 'actions')) 
  ? fs.readdirSync(resolve(__dirname, 'actions')).filter(dir => fs.statSync(resolve(__dirname, 'actions', dir)).isDirectory())
  : [];

const input: Record<string, string> = {
  main: resolve(__dirname, 'index.html'),
  marketplace: resolve(__dirname, 'marketplace.html'),
  success: resolve(__dirname, 'success.html'),
};

actionDirs.forEach(dir => {
  const htmlPath = resolve(__dirname, 'actions', dir, 'index.html');
  if (fs.existsSync(htmlPath)) {
    input[`action-${dir}`] = htmlPath;
  }
});

export default defineConfig({
  base: '/textflow-marketplace/',
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input
    }
  }
});
