const config = require('xtconf')()

module.exports = {
  development: config.get('database'),
  test: config.get('database'),
  staging: config.get('database'),
  production: config.get('database'),
}
