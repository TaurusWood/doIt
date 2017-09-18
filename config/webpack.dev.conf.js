const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 3007,
    compress: true,
    hot: true
  }
})
