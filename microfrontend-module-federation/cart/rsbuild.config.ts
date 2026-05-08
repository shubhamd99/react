import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  server: {
    port: 3002,
  },
  moduleFederation: {
    options: {
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './CartSummary': './src/CartSummary',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    },
  },
  plugins: [pluginReact()],
});
