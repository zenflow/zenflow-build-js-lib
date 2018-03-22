/* eslint-env jest */

const path = require('path')
const buildFixture = require('./util/buildFixture')
const { readFile, readdir } = require('./util/fs')

describe('ecmascript-features', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('ecmascript-features')
  })
  test('have each file listed in package.json', async () => {
    expect(await readdir(path.join(tempDir, 'dist'))).toEqual([
      'ecmascript-features-fixture.cjs.js',
    ])
  })
  test('snapshot', async () => {
    const file = path.join(tempDir, 'dist/ecmascript-features-fixture.cjs.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
})
