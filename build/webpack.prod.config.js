const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

// Helpers
const resolve = file => require('path').resolve(__dirname, file);

module.exports = merge(baseWebpackConfig, {
  devtool: '#source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'ThreeText'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.js$/,
        loaders: [ 'babel-loader' ],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  }
});
