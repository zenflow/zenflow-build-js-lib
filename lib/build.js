const path = require('path')
const del = require('del')
const { rollup } = require('rollup')
const getRollupOptions = require('../lib/rollup-options')

module.exports = async ({ log, cwd, args }) => {
  const myLog = args.debug ? log.bind(null, 'debug:') : () => {}
  myLog('init', { cwd, args })

  myLog('cleaning dist dir...')
  await del(path.join(cwd, 'dist'))
  myLog('cleaned dist dir')

  // TODO: Buffer log lines and print lines for one task at a time
  const { minify, sourcemap } = args
  const rollupOptions = getRollupOptions({ cwd, minify, sourcemap })
  await Promise.all(
    toArray(rollupOptions).map(
      async ({ inputOptions, outputOptions }, index) => {
        const myMyLog = myLog.bind(null, `[${index}]`)
        myMyLog('inputOptions:', inputOptions)
        myMyLog('outputOptions:', outputOptions)
        const bundle = await rollup(inputOptions)
        myMyLog('bundle.imports:', bundle.imports)
        myMyLog('bundle.exports:', bundle.exports)
        await Promise.all(
          toArray(outputOptions).map(async outputOptions => {
            myMyLog(`building \`${outputOptions.file}\`...`)
            await bundle.write(outputOptions)
            myMyLog(`built \`${outputOptions.file}\``)
          }),
        )
      },
    ),
  )
}

function toArray(maybeArray) {
  return [].concat(maybeArray)
}
