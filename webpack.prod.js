const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

module.exports = merge(common, {
  mode: 'production', //  minify or compress
  // devtool: 'hidden', // won't add evals in the final file
  output: {
    // where and in what name webpack bundle the code
    filename: '[name].[contenthash].js', // change only when a code changes. Hence, browser cn cache the file and know when to update it again as the file name changes
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CleanWebpackPlugin({ verbose: true }),
    new LinkTypePlugin({
      '*.css': 'text/css',
      '*.js': 'text/javascript',
      '*.png': 'image/png',
      '*.jpg': 'image/jpeg',
      '*.jpeg': 'image/jpeg',
      '*.gif': 'image/gif',
      '*.webp': 'image/webp',
      '*.bmp': 'image/bmp',
    }),
  ], // delete the previous build and create the new build
  module: {
    rules: [
      {
        test: /\.scss$/, // regular expression /regex/
        //scss-loader converts into  sass to css,copile css into js,
        use: [
          MiniCssExtractPlugin.loader, // 3. spits a new file
          'css-loader', //2. compiles css into javascript
          'sass-loader', //1. compiles sass to css
          // sp basically style-loader(css-loader(sass-loader))
        ], // anytime a file mmatches the test regular expression, use these loaders. Order matters!!!!
      },
    ],
  },
});
