/* eslint-env jest */

const path = require('path')
const buildFixture = require('./util/buildFixture')
const { readFile, writeFile } = require('./util/fs')

describe('watch-mode', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('minimal', { debug: true, watch: true })
    await new Promise(resolve => setTimeout(resolve, 500))
  })
  test('works', async () => {
    const distFile = path.join(tempDir, 'dist/minimal-fixture.es.js')
    const distFileDataBefore = await readFile(distFile)

    const srcFile = path.join(tempDir, 'src/index.js')
    let srcFileData = await readFile(srcFile)
    srcFileData = replaceFooValue(srcFileData)
    await writeFile(srcFile, srcFileData)

    await new Promise(resolve => setTimeout(resolve, 1500))

    const distFileDataAfter = await readFile(distFile)
    expect(distFileDataAfter).toEqual(replaceFooValue(distFileDataBefore))
  })
})

function replaceFooValue(str) {
  return str.replace(/'foo'/g, "'baz'")
}
