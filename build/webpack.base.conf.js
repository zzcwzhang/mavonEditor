var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
var _entry= {
  app: './src/main.js',
  vue: ['vue']
};

module.exports = {
  entry: _entry,
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
/*
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
*/
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },{
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:7].[ext]',
          publicPath: '../'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: 'node_modules/mavon-editor/dist/highlightjs',
        to: path.resolve(__dirname, '../dist/highlightjs')
    }, {
        from: 'node_modules/mavon-editor/dist/markdown',
        to: path.resolve(__dirname, '../dist/markdown')
    }, {
        from: 'node_modules/mavon-editor/dist/katex',
        to: path.resolve(__dirname, '../dist/katex')
    }]),
  ]
}
