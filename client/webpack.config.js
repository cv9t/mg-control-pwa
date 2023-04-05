const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = (_, argv) => {
  const isDev = argv.mode === "development";

  console.log(isDev);

  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!index.html"],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
      ],
    }),
  ];

  const alias = {
    "@/components": path.resolve(__dirname, "src/components"),
  };

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  return {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDev ? "js/[name].js" : "js/[name].[contenthash].js",
      publicPath: "/",
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: isDev,
      open: isDev,
    },
    devtool: isDev ? "eval-source-map" : false,
    resolve: {
      alias,
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                babelrc: true,
              },
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
        },
      ],
    },
    plugins,
  };
};
