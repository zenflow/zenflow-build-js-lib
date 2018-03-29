const path = require('path')
const camelCase = require('camelcase')
const formatFields = require('./moduleFormatPackageFields')
const getBabelConfig = require('./Config/getBabelConfig')

class Config {
  constructor(cwd) {
    this.pkg = require(path.join(cwd, './package.json'))
    const userConfig =
      (this.pkg.zenflowConfig && this.pkg.zenflowConfig.build) || {}

    this.formats = ['cjs', 'es', 'umd'].filter(
      format => this.pkg[formatFields[format]],
    )

    this.externals = [
      ...Object.keys(this.pkg.dependencies || {}),
      ...Object.keys(this.pkg.peerDependencies || {}),
    ]

    this.babel = getBabelConfig(cwd, this.pkg)

    this.global = camelCase(this.pkg.name)

    this.globals = {}
    for (const external of this.externals) {
      this.globals[external] = camelCase(external)
    }
    Object.assign(this.globals, userConfig.globals || {})
  }
}

module.exports = Config
