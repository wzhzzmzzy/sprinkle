const { HEALTH_CHECK } = require('./health');
const { TYPE_RACER } = require('./type-racer');

module.exports = [
  ...HEALTH_CHECK,
  ...TYPE_RACER
]
