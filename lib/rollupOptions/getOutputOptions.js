const path = require('path')
const slash = require('slash')
const moduleFormatPackageFields = require('../moduleFormatPackageFields')

function getMinifiedFile(file) {
  return path.join(path.dirname(file), path.basename(file, '.js') + '.min.js')
}

module.exports = function getOutputOptions({ pkg, minify, sourcemap, format }) {
  const field = moduleFormatPackageFields[format]
  const file = slash(minify ? getMinifiedFile(pkg[field]) : pkg[field])
  const options = {
    format,
    file,
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
    options.name = pkg.zenflowConfig.build.global
    options.globals = pkg.zenflowConfig.build.globals
  }
  return options
}
