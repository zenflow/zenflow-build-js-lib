const path = require('path')
const getInputOptions = require('./rollupOptions/getInputOptions')
const moduleFormatPackageFields = require('./moduleFormatPackageFields')
const getOutputOptions = require('./rollupOptions/getOutputOptions')

module.exports = ({ cwd }) => {
  const pkg = require(path.join(cwd, './package.json'))
  return [false, true].map(minify => ({
    inputOptions: getInputOptions({ cwd, pkg, minify }),
    outputOptions: Object.keys(moduleFormatPackageFields).map(format =>
      getOutputOptions({ pkg, minify, format }),
    ),
  }))
}
