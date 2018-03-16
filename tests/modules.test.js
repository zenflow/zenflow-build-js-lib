/* eslint-env jest */

const path = require('path')
const buildFixture = require('./util/buildFixture')
const { readFile, fileExists } = require('./util/fs')
const { flatmap, repeat } = require('./util/util')

describe('fixtures/modules', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('modules', { extras: true })
  })
  test('snapshot (A) evaluated cjs', async () => {
    const file = path.join(tempDir, 'dist/modules.cjs.js')
    expect(require(file)).toMatchSnapshot()
  })
  test('snapshot (A) evaluated umd', async () => {
    const file = path.join(tempDir, 'dist/modules.umd.js')
    expect(require(file)).toMatchSnapshot()
  })
  test('snapshot (B) built cjs', async () => {
    const file = path.join(tempDir, 'dist/modules.cjs.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (B) built es', async () => {
    const file = path.join(tempDir, 'dist/modules.es.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (B) built umd', async () => {
    const file = path.join(tempDir, 'dist/modules.umd.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('minified versions and source maps exist in each format', async () => {
    const files = flatmap(['cjs', 'es', 'umd'], format =>
      flatmap([false, true], minify =>
        flatmap([false, true], sourcemap =>
          path.join(
            tempDir,
            'dist',
            `modules.${format}` +
              (minify ? '.min' : '') +
              '.js' +
              (sourcemap ? '.map' : ''),
          ),
        ),
      ),
    )
    const filesExist = await Promise.all(files.map(fileExists))
    expect(filesExist).toEqual(repeat(true, 3 * 2 * 2))
  })
})
