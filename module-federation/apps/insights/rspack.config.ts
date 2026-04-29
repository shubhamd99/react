// node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// third-party
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import * as rspack from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const isDev = process.env.NODE_ENV !== 'production';

export default {
  entry: './src/main.tsx',
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    publicPath: 'http://localhost:4202/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@insights': path.resolve(__dirname, 'src'),
      '@repo/ui': path.resolve(root, 'packages/ui/src/index.ts'),
      '@repo/utils': path.resolve(root, 'packages/utils/src/index.ts'),
      '@repo/mocks': path.resolve(root, 'packages/mocks/src/index.ts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript', tsx: true },
              transform: { react: { runtime: 'automatic', refresh: isDev } },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './index.html' }),
    new rspack.DefinePlugin({ __APP_VERSION__: JSON.stringify('1.0.0') }),
    new ModuleFederationPlugin({
      name: 'insights',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './InsightsShell': './src/InsightsShell',
      },
      remotes: {
        host: 'host@http://localhost:4200/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^19.1.0' },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^19.1.0',
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^6.30.0',
        },
      },
    }),
    ...(isDev ? [new ReactRefreshPlugin()] : []),
  ],
  devServer: {
    port: 4202,
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  experiments: { css: true, lazyCompilation: false },
  mode: isDev ? 'development' : 'production',
} satisfies rspack.Configuration;
