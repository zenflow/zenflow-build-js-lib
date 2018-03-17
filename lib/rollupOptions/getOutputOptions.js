const path = require('path')
const slash = require('slash')
const moduleFormatPackageFields = require('../moduleFormatPackageFields')

function getMinifiedFile(file) {
  return path.join(path.dirname(file), path.basename(file, '.js') + '.min.js')
}

function getOutputOptions({ cwd, config, minify, sourcemap, format }) {
  const { pkg } = config
  const field = moduleFormatPackageFields[format]
  const file = slash(minify ? getMinifiedFile(pkg[field]) : pkg[field])
  const options = {
    format,
    file: path.join(cwd, file),
    sourcemap,
    banner: `\
/** @preserve
  * package: ${pkg.name} v${pkg.version}
  * file: ${file}
  * homepage: ${pkg.homepage}
  * license: ${pkg.license}
  **/`,
  }
  if (format === 'umd') {
    options.name = config.global
    options.globals = config.globals
  }
  return options
}

module.exports = getOutputOptions
