const pMemoize = require('p-memoize')
const tempy = require('tempy')
const execa = require('execa')
const recursiveCopy = require('recursive-copy')
const build = require('../../lib/zenflow-build-js-lib')

const _buildFixture = pMemoize(async ({ fixture, extras }) => {
  const fixtureDir = `tests/fixtures/${fixture}`
  const tempDir = tempy.directory()
  await recursiveCopy(fixtureDir, tempDir)
  await execa.shell(`npm install`, { cwd: tempDir })
  await build({
    log: console.log,
    cwd: tempDir,
    args: {
      minify: extras,
      sourcemap: extras,
    },
  })
  return tempDir
})

/**
 * Install the given `fixture` in a temp directory
 * Normalizes input before passing to memoized function
 * @param fixture
 * @param extras build .min.js and .js.map files
 * @returns tempDir Where the fixture is installs
 */
function buildFixture(fixture, { extras } = {}) {
  if (typeof fixture !== 'string') {
    throw new TypeError('buildFixture: `fixture` must be a string')
  }
  extras = Boolean(extras)
  return _buildFixture({ fixture, extras })
}

module.exports = buildFixture
