const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === "dev ";

let config = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    watchFiles: ["src/**/*"],
    hot: true,
    open: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: !IS_DEV,
      filename: "index.html",
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "" }, //to the dist root directory
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [],
  },
};
if (!IS_DEV) {
  config.optimization.minimizer.push(new TerserPlugin());
}

module.exports = config;
