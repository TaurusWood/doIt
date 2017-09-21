const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const OPTIONS = {
  APP_PATH: path.join(__dirname, '../app'),
  DIST_PATH: path.join(__dirname, '../dist'),
  ASSETS_PATH: path.join('assets'),
  STYLE_PATH: path.join('css'),
};

const entry = {
  app: path.join(OPTIONS.APP_PATH, 'app.js'),
  vendor: ['vue', 'iview']
};

const output = {
  path: OPTIONS.DIST_PATH,
  filename: 'js/[name].[hash:5].js',
  publicPath: '/',
};

const resolve = {
  extensions: ['.js', '.vue', '.scss'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': OPTIONS.APP_PATH
  }
};

const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const scssRule = {
  test: /\.scss$/,
  include: OPTIONS.APP_PATH,
  exclude: /node_modules/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
      }
    ]
  })
};

const babelRule = {
  test: /\.js$/,
  include: OPTIONS.APP_PATH,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      ['env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
      'stage-2',
    ],
    plugins: [
      'transform-runtime',
    ]
  }
}

const vueRule = {
  test: /\.vue$/,
  use: [{
    loader: 'vue-loader',
    options: {
      extractCSS: true,
      loaders: {
        scss: ['style-loader', 'css-loader', 'sass-loader'],
      }
    }
  }]
}

const assetsRule = {
  test: /\.(png|jpg|gif|ico|svg)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: `${OPTIONS.ASSETS_PATH}/images/[name].[hash:6].[ext]`
    }
  }]
}

const fontRule = {
   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
   use: [{
     loader: 'url-loader',
     options: {
       limit: 10000,
       name: `${OPTIONS.ASSETS_PATH}/font/[name].[hash:6].[ext]`
     }
   }]
}

const htmlRule = {
  test: /\.html$/,
  use: [{
    loader: 'html-loader',
  }],
};

const plugins = [
  new HtmlWebpackPlugin({
    filename: `${OPTIONS.DIST_PATH}/index.html`,
    template: path.join(OPTIONS.APP_PATH, 'index.html'),
    chunks: ['vendor', 'app'],
    title: 'doIt'
  }),
  new ExtractTextPlugin({
    filename: `${OPTIONS.STYLE_PATH}/[name].css`,
    allChunks: true,
  })
]

const baseConf = function () {
  return {
    entry,
    output,
    resolve,
    module: {
      rules: [
        babelRule,
        cssRule,
        scssRule,
        vueRule,
        assetsRule,
        fontRule,
        htmlRule
      ]
    },
    plugins
  }
}

module.exports = baseConf();
