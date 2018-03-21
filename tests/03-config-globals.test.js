/* eslint-env jest */

const path = require('path')
const buildFixture = require('./util/buildFixture')
const { readFile, readdir } = require('./util/fs')

describe('config-globals', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('config-globals')
  })
  test('have each file listed in package.json', async () => {
    expect(await readdir(path.join(tempDir, 'dist'))).toEqual([
      'config-globals-fixture.umd.js',
    ])
  })
  test('snapshot', async () => {
    const file = path.join(tempDir, 'dist/config-globals-fixture.umd.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
})
