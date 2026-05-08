import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    template: './public/index.html',
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  output: {
    distPath: {
      root: 'dist/client',
    },
  },
  plugins: [pluginReact()],
});
