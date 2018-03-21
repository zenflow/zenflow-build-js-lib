#!/usr/bin/env node

const minimist = require('minimist')
const build = require('./lib/zenflow-build-js-lib')

build({
  log: console.log,
  cwd: process.cwd(),
  args: Object.assign(
    {
      debug: false,
      minify: false,
      sourcemap: false,
    },
    minimist(process.argv.slice(2)),
  ),
}).catch(error => {
  console.error(error)
  process.exit(1)
})
