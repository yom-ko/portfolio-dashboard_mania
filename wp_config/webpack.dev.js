const webpack = require('webpack');
const merge = require('webpack-merge');

// Webpack plugins
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'warning'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: '192.168.1.9',
        port: 3000,
        // proxy the Webpack Dev Server endpoint through BrowserSync
        proxy: 'http://localhost:8080/',
        notify: false
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )
  ]
});
