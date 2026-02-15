const rspack = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('@rspack/core').Configuration}
 */
module.exports = {
  mode: isDev ? "development" : "production",
  entry: {
    main: "./src/main.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      // TypeScript and JSX/TSX
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
            },
          },
        ],
      },
      // CSS (excluding CSS Modules)
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        type: "css",
      },
      // CSS Modules
      {
        test: /\.module\.css$/,
        type: "css/module",
      },
      // Images and Assets
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
      inject: "body",
    }),
    isDev && new ReactRefreshPlugin(),
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ].filter(Boolean),
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  devtool: isDev ? "cheap-module-source-map" : "source-map",
  optimization: {
    minimize: !isDev,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: "single",
  },
  stats: {
    colors: true,
    preset: "normal",
  },
};
