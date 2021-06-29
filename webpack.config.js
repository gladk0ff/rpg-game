const path = require('path');
const HTMLwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test:/\.scss$/,
        use:[
          'style-loader','css-loader','sass-loader'
        ]
      },
      {
        test:[/\.svg$/,/\.png$/,/\.jpeg$/,/\.bmp$/,/\.gif$/,],
        use:[
          {
            loader:'file-loader',
            options:{
              name:'[name].[ext]',
              outputPath:'assets/',
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HTMLwebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  devServer: {
    port: 3000,
    overlay: true,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
