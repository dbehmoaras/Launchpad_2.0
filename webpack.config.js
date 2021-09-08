const path = require("path");
require("dotenv").config();
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: ["./src/client/index.tsx"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
      { test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  target: "web",
  devServer: {
    hot: true,
    port: process.env.DEV_PORT,
    historyApiFallback: true,
    static: {
      directory: "./build",
    },
    // contentBase: path.resolve(__dirname, "./build"),
    proxy: {
      "/": {
        target: `http://localhost:${process.env.SERVER_PORT}`,
        secure: false,
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          }
        },
      },
    },
  },
};
