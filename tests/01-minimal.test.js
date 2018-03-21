/* eslint-env jest */

const path = require('path')
const { flatten } = require('ramda')
const buildFixture = require('./util/buildFixture')
const { readFile, readdir } = require('./util/fs')

describe('minimal', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('minimal', { prod: true })
  })
  test('have each file listed in package.json, minified and non-minified, plus sourcemaps', async () => {
    expect(await readdir(path.join(tempDir, 'dist'))).toEqual(
      flatten(
        ['cjs', 'es', 'umd'].map(format =>
          [false, true].map(minify =>
            [false, true].map(
              sourcemap =>
                'minimal-fixture.' +
                format +
                (minify ? '.min' : '') +
                '.js' +
                (sourcemap ? '.map' : ''),
            ),
          ),
        ),
      ),
    )
  })
  test('evaluated module exports', async () => {
    const cjsFile = path.join(tempDir, 'dist/minimal-fixture.cjs.js')
    expect(require(cjsFile)).toEqual('foo bar')
    const umdFile = path.join(tempDir, 'dist/minimal-fixture.umd.js')
    expect(require(umdFile)).toEqual('foo bar')
  })
  test('snapshot', async () => {
    const files = await Promise.all(
      [
        'dist/minimal-fixture.cjs.js',
        'dist/minimal-fixture.cjs.min.js',
        'dist/minimal-fixture.es.js',
        'dist/minimal-fixture.es.min.js',
        'dist/minimal-fixture.umd.js',
        'dist/minimal-fixture.umd.min.js',
      ].map(file => readFile(path.join(tempDir, file))),
    )
    expect(files).toMatchSnapshot()
  })
})
