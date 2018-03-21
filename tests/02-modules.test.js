/* eslint-env jest */

const path = require('path')
const buildFixture = require('./util/buildFixture')
const { readFile, readdir } = require('./util/fs')

describe('modules', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('modules')
  })
  test('have each file listed in package.json', async () => {
    const expectedFiles = ['cjs', 'es', 'umd'].map(
      format => `modules-fixture.${format}.js`,
    )
    expect(await readdir(path.join(tempDir, 'dist'))).toEqual(expectedFiles)
  })
  test('evaluated module exports', async () => {
    const expected = {
      SQR_SQRT_HALF: 0.5000000000000001,
      SQR_SQRT2: 2.0000000000000004,
    }
    const cjsFile = path.join(tempDir, 'dist/modules-fixture.cjs.js')
    expect(require(cjsFile)).toEqual(expected)
    const umdFile = path.join(tempDir, 'dist/modules-fixture.umd.js')
    expect(require(umdFile)).toEqual(expected)
  })
  test('snapshot', async () => {
    const files = await Promise.all(
      [
        'dist/modules-fixture.cjs.js',
        'dist/modules-fixture.es.js',
        'dist/modules-fixture.umd.js',
      ].map(file => readFile(path.join(tempDir, file))),
    )
    expect(files).toMatchSnapshot()
  })
})
