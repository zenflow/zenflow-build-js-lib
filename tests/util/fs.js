const { promisify } = require('util')
const fs = require('fs')

const fsReadFile = promisify(fs.readFile)
const readFile = file => fsReadFile(file, 'utf8')

const fsStat = promisify(fs.stat)
const tryStat = file => fsStat(file).catch(() => null)
const fileExists = file => tryStat(file).then(Boolean)

module.exports = {
  readFile,
  fileExists,
}
