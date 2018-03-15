const del = require('del')
const { rollup } = require('rollup')
const { debug } = require('../lib/util/log')
const getRollupOptions = require('../lib/rollup-options')

module.exports = async ({ cwd, args, distDir }) => {
  debug('init', { cwd, args, distDir })

  debug('cleaning dist dir...')
  await del(distDir)
  debug('cleaned dist dir')

  // TODO: Buffer log lines and print lines for one task at a time
  const rollupOptions = getRollupOptions({ cwd })
  await Promise.all(
    toArray(rollupOptions).map(
      async ({ inputOptions, outputOptions }, index) => {
        const myDebug = debug.bind(null, `[${index}]`)
        myDebug('inputOptions:', inputOptions)
        myDebug('outputOptions:', outputOptions)
        const bundle = await rollup(inputOptions)
        myDebug('bundle.imports:', bundle.imports)
        myDebug('bundle.exports:', bundle.exports)
        await Promise.all(
          toArray(outputOptions).map(async outputOptions => {
            myDebug(`building \`${outputOptions.file}\`...`)
            await bundle.write(outputOptions)
            myDebug(`built \`${outputOptions.file}\``)
          }),
        )
      },
    ),
  )
}

function toArray(maybeArray) {
  return [].concat(maybeArray)
}
