const { HEALTH_CHECK } = require('./health')

module.exports = {
  mocks: [
    ...HEALTH_CHECK
  ]
}
