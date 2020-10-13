const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
  mode: 'development', //  doenst' minify or compress
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ], // creates the html for you with.without a template html file

  module: {
    rules: [
      {
        test: /\.scss$/, // regular expression /regex/
        //scss-loader converts into  javascript code,style loader injects it into the dom
        use: [
          'style-loader', // 3. Injects styles into the dom
          'css-loader', //2. compiles css into javascript
          'sass-loader', //1. compiles sass to css
          // sp basically style-loader(css-loader(sass-loader))
        ], // anytime a file mmatches the test regular expression, use these loaders. Order matters!!!!
      },
    ],
  },
});
