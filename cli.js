#!/usr/bin/env node

const path = require('path')
const del = require('del')
const { rollup } = require('rollup')
const { debug, log } = require('./lib/util/log')
const getRollupOptions = require('./lib/rollup-options')

main().catch(error => {
  console.error(error)
  process.exit(1)
})


async function main () {
  const cwd = process.cwd()
  const args = process.argv.slice(2)
  const distDir = path.join(cwd, 'dist')
  debug('init', { cwd, args })

  debug('cleaning dist dir...')
  await del(distDir)
  debug('cleaned dist dir')

  // TODO: Buffer log lines and print lines for one task at a time
  const rollupOptions = getRollupOptions({ cwd })
  await Promise.all([].concat(rollupOptions).map(async ({ inputOptions, outputOptions }, index) => {
    const myDebug = debug.bind(null, `[${index}]`)
    myDebug('inputOptions:', inputOptions)
    myDebug('outputOptions:', outputOptions)
    const bundle = await rollup(inputOptions)
    myDebug('bundle.imports:', bundle.imports)
    myDebug('bundle.exports:', bundle.exports)
    await Promise.all([].concat(outputOptions).map(async outputOptions => {
      myDebug(`building \`${outputOptions.file}\`...`)
      await bundle.write(outputOptions)
      myDebug(`built \`${outputOptions.file}\``)
    }))
  }))
}
