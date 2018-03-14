const { inspect } = require('util')
const { isDebug } = require('../cli-flags')

const argToStr = arg =>
  typeof arg === 'string' ? arg : inspect(arg, { breakLength: Infinity })
const log = (...args) => console.log(args.map(argToStr).join(' '))

const debug = isDebug ? log.bind(null, 'debug:') : () => {}

module.exports = {
  log,
  debug,
}
