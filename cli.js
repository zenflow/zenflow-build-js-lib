#!/usr/bin/env node

const path = require('path')

const cwd = process.cwd()
const args = process.argv.slice(2)
const distDir = path.join(cwd, 'dist')

require('./lib/main')({ cwd, args, distDir }).catch(error => {
  console.error(error)
  process.exit(1)
})
