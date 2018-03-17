const getInputOptions = require('./rollupOptions/getInputOptions')
const getOutputOptions = require('./rollupOptions/getOutputOptions')

module.exports = ({ cwd, config, minify, sourcemap }) => {
  return (minify ? [false, true] : [false]).map(minify => ({
    inputOptions: getInputOptions({ cwd, config, minify }),
    outputOptions: config.formats.map(format =>
      getOutputOptions({ cwd, config, minify, sourcemap, format }),
    ),
  }))
}
