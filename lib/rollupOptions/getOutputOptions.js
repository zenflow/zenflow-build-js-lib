const path = require('path')
const slash = require('slash')
const formatFields = require('../moduleFormatPackageFields')

function getMinifiedFile(file) {
  return path.join(path.dirname(file), path.basename(file, '.js') + '.min.js')
}

function getBanner(pkg, file) {
  let banner = `/** @preserve
  * package: ${pkg.name} v${pkg.version}
  * file: ${file}\n`
  if (pkg.homepage) {
    banner += `  * homepage: ${pkg.homepage}\n`
  }
  if (pkg.license) {
    banner += `  * license: ${pkg.license}\n`
  }
  return banner + `  **/\n`
}

function getOutputOptions({ cwd, config, prod, minify, format }) {
  const { pkg } = config
  const field = formatFields[format]
  const file = slash(minify ? getMinifiedFile(pkg[field]) : pkg[field])
  const options = {
    format,
    file: path.join(cwd, file),
    sourcemap: prod,
    banner: getBanner(pkg, file),
  }
  if (format === 'umd') {
    options.name = config.global
    options.globals = config.globals
  }
  return options
}

module.exports = getOutputOptions
