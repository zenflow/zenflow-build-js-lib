const { promisify } = require('util')
const fs = require('fs')

const fsReadFile = promisify(fs.readFile)
const readFile = file => fsReadFile(file, 'utf8')

const writeFile = promisify(fs.writeFile)

const fsStat = promisify(fs.stat)
const tryStat = file => fsStat(file).catch(() => null)
const fileExists = file => tryStat(file).then(Boolean)
const readdir = promisify(fs.readdir)

module.exports = {
  readFile,
  writeFile,
  fileExists,
  readdir,
}
