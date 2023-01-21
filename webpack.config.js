const path = require("path");

const TerserPlugin = require("terser-webpack-plugin"); //plugin pour minifier et optimiser le code js
const HtmlWebpackPlugin = require("html-webpack-plugin"); //plugin qui simplifie la création de fichiers HTML dans le fichier dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // plugin pour extraire les fichier css de fichier js
const CopyPlugin = require("copy-webpack-plugin"); // pour copier les fichier d'un dossier dans le dossier dist

const IS_DEV = process.env.NODE_ENV === "dev ";

let config = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    watchFiles: ["src/**/*"],
    hot: true, //pour faire auto refresh en cas de changement dans l'un des fichier dans src
    open: true, // pour ouvrir le navigateur sur l'application l'or du premeier lancement
    port: 8080, //le port par defaut
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
        { from: "assets", to: "" }, // copier le contenu du dossier assets dans le dossier de sortie (dist)
      ],
    }),
  ],
  // les règles définies pour chaque type de module importer dans js
  module: {
    rules: [
      // règle des modules js
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // ignorer les modules qui proviennet des packages extérieurs
        use: ["babel-loader"], // utiliser https://github.com/babel/babel-loader pour la transpilation du js
      },
      // règle des modules css
      {
        test: /\.css$/i,
        // style-loader s'execute uniquement dans le mode dev car il est plus rapide
        // En prod MiniCssExtractPlugin car c'est mieux de séparer le css du js
        use: [
          IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [],
  },
};
// En prod optimiser la taille des fichiers en sortie
if (!IS_DEV) {
  config.optimization.minimizer.push(new TerserPlugin());
}

module.exports = config;
