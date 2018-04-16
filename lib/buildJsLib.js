const path = require('path')
const del = require('del')
const rollup = require('rollup')
// const getRollupOptions = require('./rollupOptions')
const Config = require('./Config')
const getInputOptions = require('./rollupOptions/getInputOptions')
const getOutputOptions = require('./rollupOptions/getOutputOptions')

async function buildJsLib({ log, cwd, args }) {
  const myLog = args.debug ? log.bind(null, 'debug:') : () => {}
  myLog('init', { cwd, args })

  myLog('cleaning dist dir...')
  await del(path.join(cwd, 'dist'))
  myLog('cleaned dist dir')

  // TODO: Buffer log lines and print lines for one task at a time
  const config = new Config(cwd)
  const { prod, watch } = args
  if (prod && watch) {
    throw new Error('Cannot use `--prod` and `--watch` options together')
  }
  if (watch) {
    await doWatch(cwd, myLog, config)
  } else {
    await doBuild(cwd, myLog, config, prod)
  }
}

function doWatch(cwd, myLog, config) {
  const watcher = rollup.watch({
    ...getInputOptions({ cwd, config }),
    output: config.formats.map(format =>
      getOutputOptions({ cwd, config, format }),
    ),
  })
  watcher.on('event', event => {
    myLog('rollup event:', event)
  })
  return {
    started: new Promise((resolve, reject) => {
      watcher.on('event', event => {
        if (event.code === 'END') {
          resolve()
        } else if (event.code === 'ERROR' || event.code === 'FATAL') {
          reject(
            Object.assign(new Error(`${event.code} event from Rollup`), {
              event,
            }),
          )
        }
      })
    }),
    forever: new Promise((resolve, reject) => {
      watcher.on('event', event => {
        if (event.code === 'ERROR' || event.code === 'FATAL') {
          reject(
            Object.assign(new Error(`${event.code} event from Rollup`), {
              event,
            }),
          )
        }
      })
    }),
  }
}

async function doBuild(cwd, myLog, config, prod) {
  const rollupOptions = (prod ? [false, true] : [false]).map(minify => ({
    inputOptions: getInputOptions({ cwd, config, minify }),
    outputOptions: config.formats.map(format =>
      getOutputOptions({ cwd, config, prod, minify, format }),
    ),
  }))
  await Promise.all(
    rollupOptions.map(async ({ inputOptions, outputOptions }, index) => {
      const myMyLog = myLog.bind(null, `[${index}]`)
      myMyLog('inputOptions:', inputOptions)
      myMyLog('outputOptions:', outputOptions)
      const bundle = await rollup.rollup(inputOptions)
      myMyLog('bundle.imports:', bundle.imports)
      myMyLog('bundle.exports:', bundle.exports)
      await Promise.all(
        outputOptions.map(async outputOptions => {
          myMyLog(`building \`${outputOptions.file}\`...`)
          await bundle.write(outputOptions)
          myMyLog(`built \`${outputOptions.file}\``)
        }),
      )
    }),
  )
}

module.exports = buildJsLib
