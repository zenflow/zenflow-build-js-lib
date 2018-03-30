const path = require('path')
const fs = require('fs')
const json5 = require('json5')

module.exports = (cwd, pkg) => {
  const babelRcFile = path.join(cwd, '.babelrc')
  const config = fs.existsSync(babelRcFile)
    ? json5.parse(fs.readFileSync(babelRcFile, 'utf8'))
    : pkg.babel || {}
  config.presets = config.presets || []
  config.plugins = config.plugins || []

  // simple changes
  Object.assign(config, {
    babelrc: false,
    exclude: 'node_modules/**',
  })

  // look for babel-preset-env and if found disable `modules` option
  let envPreset = config.presets.find(
    ([name, options]) => name === 'babel-preset-env' || name === 'env',
  )
  if (envPreset) {
    envPreset[1] = envPreset[1] || {}
    envPreset[1].modules = false
  }

  // add the external-helpers plugin
  config.plugins.unshift([require.resolve('babel-plugin-external-helpers')])

  return config
}
