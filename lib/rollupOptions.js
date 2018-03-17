const getInputOptions = require('./rollupOptions/getInputOptions')
const moduleFormatPackageFields = require('./moduleFormatPackageFields')
const getOutputOptions = require('./rollupOptions/getOutputOptions')

module.exports = ({ cwd, config, minify, sourcemap }) => {
  return (minify ? [false, true] : [false]).map(minify => ({
    inputOptions: getInputOptions({ cwd, config, minify }),
    outputOptions: Object.keys(moduleFormatPackageFields).map(format =>
      getOutputOptions({ cwd, config, minify, sourcemap, format }),
    ),
  }))
}
