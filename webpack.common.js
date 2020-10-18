const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
module.exports = {
  // devtool: 'none', // won't add evals in the final file
  entry: './src/index.jsx', //where the main file is
  // output: {
  //   // where and in what name webpack bundle the code
  //   filename: 'main.[contentHash].js', // change only when a code changes. Hence, browser cn cache the file and know when to update it again as the file name changes
  //   path: path.resolve(__dirname, 'build'),
  // },
  plugins: [new ESLintPlugin()],
  // ...
  module: {
    // loaders to use and rules for them like which file to target and stuff
    rules: [
      //list of rules and which loaders to use when a rule is applied and in which order

      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ['babel-loader'],
      },

      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            ouputPath: 'images',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
