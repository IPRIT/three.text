const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

// Helpers
const resolve = file => require('path').resolve(__dirname, file);

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].js',
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'ThreeText'
  },
  resolve: {
    extensions: ['*', '.js', '.json'],
    alias: {
      'three-text': resolve('../src')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  devServer: {
    contentBase: resolve('../dev'),
    publicPath: '/dev/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3210',
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false })
  ]
};
