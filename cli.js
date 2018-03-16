#!/usr/bin/env node

const minimist = require('minimist')
const build = require('./lib/build')

build({
  log: console.log,
  cwd: process.cwd(),
  args: minimist(process.argv.slice(2)),
}).catch(error => {
  console.error(error)
  process.exit(1)
})
