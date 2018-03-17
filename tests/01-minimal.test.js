/* eslint-env jest */

const path = require('path')
const { flatten, repeat } = require('ramda')
const buildFixture = require('./util/buildFixture')
const { readFile, fileExists } = require('./util/fs')

describe('minimal', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('minimal', { extras: true })
  })
  test('snapshot (A) evaluated cjs', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.cjs.js')
    expect(require(file)).toMatchSnapshot()
  })
  test('snapshot (A) evaluated umd', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.umd.js')
    expect(require(file)).toMatchSnapshot()
  })
  test('snapshot (B) built cjs', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.cjs.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (B) built es', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.es.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (B) built umd', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.umd.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (C) built cjs.min', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.cjs.min.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (C) built es.min', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.es.min.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (C) built umd.min', async () => {
    const file = path.join(tempDir, 'dist/minimal-fixture.umd.min.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('source maps exist for each format', async () => {
    const files = flatten(
      ['cjs', 'es', 'umd'].map(format =>
        [false, true].map(minify =>
          path.join(
            tempDir,
            'dist',
            `minimal-fixture.${format}` + (minify ? '.min' : '') + '.js.map',
          ),
        ),
      ),
    )
    const filesExist = await Promise.all(files.map(fileExists))
    expect(filesExist).toEqual(repeat(true, 3 * 2))
  })
})
