const getInputOptions = require('./rollupOptions/getInputOptions')
const getOutputOptions = require('./rollupOptions/getOutputOptions')

module.exports = ({ cwd, config, prod }) => {
  return (prod ? [false, true] : [false]).map(minify => ({
    inputOptions: getInputOptions({ cwd, config, minify }),
    outputOptions: config.formats.map(format =>
      getOutputOptions({ cwd, config, prod, minify, format }),
    ),
  }))
}
