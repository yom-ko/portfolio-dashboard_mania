const path = require('path');

// Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Config constants
const ROOT = path.resolve(__dirname, '../');
const ENTRY = `${ROOT}/src/index.js`;
const OUTPUT = `${ROOT}/build`;

module.exports = {
  entry: ENTRY,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader']
      },
      {
        test: /\.(woff|ttf)$/,
        use: ['url-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4000,
              name: '[name]_[md5:hash:hex:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: OUTPUT,
    filename: '[name]_[contenthash:8].js',
    chunkFilename: '[name]_[chunkhash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(['build'], {
      root: ROOT
    }),
    new BundleAnalyzerPlugin()
  ]
};
