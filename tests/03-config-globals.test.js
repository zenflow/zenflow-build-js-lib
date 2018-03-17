/* eslint-env jest */

const path = require('path')
const buildFixture = require('./util/buildFixture')
const { readFile } = require('./util/fs')

describe('config-globals', () => {
  test('snapshot built umd', async () => {
    const tempDir = await buildFixture('config-globals')
    const file = path.join(tempDir, 'dist/config-globals-fixture.umd.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
})
