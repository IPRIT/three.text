const base = require('./webpack.prod.config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeJsPlugin = require('optimize-js-plugin');
const version = process.env.VERSION || require('../package.json').version;

const builds = {
  development: {
    config: {
      output: {
        filename: 'three.text.js',
        libraryTarget: 'umd'
      }
    }
  },
  production: {
    config: {
      output: {
        filename: 'three.text.min.js',
        libraryTarget: 'umd'
      }
    },
    env: '"production"'
  }
};

function genConfig (opts) {
  const config = merge({}, base, opts.config);

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': opts.env || '"development"'
    })
  ]);

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
      }),
      new webpack.BannerPlugin({
        banner: `/* THREE.js 2D Text Label v${version} */`,
        raw: true,
        entryOnly: true
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ]);
  }

  return config;
}

if (process.env.TARGET) {
  module.exports = genConfig( builds[process.env.TARGET] );
} else {
  module.exports = Object.keys(builds).map(name => genConfig(builds[name]));
}
