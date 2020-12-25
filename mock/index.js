const { HEALTH_CHECK } = require('./health');
const { TYPE_RACER } = require('./type-racer');
const { CALENDAR } = require('./calendar');

module.exports = [
  ...HEALTH_CHECK,
  ...TYPE_RACER,
  ...CALENDAR
]
