const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

Object.keys(baseConfig.entry).forEach((name) => {
  baseConfig.entry[name] = ['./build/client'].concat(baseConfig.entry[name]);
})

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),  // 排序输出
    new webpack.HotModuleReplacementPlugin(),
    // 在webpack 2中使用NoErrorsPlugin会有警告提示
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
