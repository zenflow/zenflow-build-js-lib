const {inspect} = require('util')
const {isDebug} = require('../cli-flags')

const log = (...args) => {
  const argsString = args
    .map(arg => typeof arg === 'string' ? arg : inspect(arg, {breakLength: Infinity}))
    .join(' ')
  console.log(argsString)
}

const debug = isDebug ? log.bind(null, 'debug:') : () => {}

module.exports = {
  log,
  debug,
}
