#!/usr/bin/env node

const minimist = require('minimist')
const buildJsLib = require('./lib/buildJsLib')

buildJsLib({
  log: console.log,
  cwd: process.cwd(),
  args: Object.assign(
    {
      debug: false,
      prod: false,
    },
    minimist(process.argv.slice(2)),
  ),
}).catch(error => {
  console.error(error)
  process.exit(1)
})
