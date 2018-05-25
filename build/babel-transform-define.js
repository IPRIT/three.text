const package = require('../package.json');

module.exports = {
  'process.env.PACKAGE_VERSION': package.version
};
