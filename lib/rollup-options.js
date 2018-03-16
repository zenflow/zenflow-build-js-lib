const path = require('path')
const getInputOptions = require('./rollupOptions/getInputOptions')
const moduleFormatPackageFields = require('./moduleFormatPackageFields')
const getOutputOptions = require('./rollupOptions/getOutputOptions')

module.exports = ({ cwd, minify, sourcemap }) => {
  const pkg = require(path.join(cwd, './package.json'))
  return (minify ? [false, true] : [false]).map(minify => ({
    inputOptions: getInputOptions({ cwd, pkg, minify }),
    outputOptions: Object.keys(moduleFormatPackageFields).map(format =>
      getOutputOptions({ pkg, minify, sourcemap, format }),
    ),
  }))
}
