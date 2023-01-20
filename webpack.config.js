const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const dev = process.env.NODE_ENV === "dev ";

let config = {
  mode: "development",
  entry: "./src/index.js",
  watch: dev,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [],
  },
};
if (!dev) {
  config.optimization.minimizer.push(new TerserPlugin());
}

module.exports = config;
