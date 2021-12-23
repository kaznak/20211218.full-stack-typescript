/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: "./index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
};
