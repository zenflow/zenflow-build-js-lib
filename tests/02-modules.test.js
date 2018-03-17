/* eslint-env jest */

const path = require('path')
const buildFixture = require('./util/buildFixture')
const { readFile } = require('./util/fs')

describe('modules', () => {
  let tempDir
  beforeAll(async () => {
    tempDir = await buildFixture('modules')
  })
  test('snapshot (A) evaluated cjs', async () => {
    const file = path.join(tempDir, 'dist/modules-fixture.cjs.js')
    expect(require(file)).toMatchSnapshot()
  })
  test('snapshot (A) evaluated umd', async () => {
    const file = path.join(tempDir, 'dist/modules-fixture.umd.js')
    expect(require(file)).toMatchSnapshot()
  })
  test('snapshot (B) built cjs', async () => {
    const file = path.join(tempDir, 'dist/modules-fixture.cjs.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (B) built es', async () => {
    const file = path.join(tempDir, 'dist/modules-fixture.es.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
  test('snapshot (B) built umd', async () => {
    const file = path.join(tempDir, 'dist/modules-fixture.umd.js')
    expect(await readFile(file)).toMatchSnapshot()
  })
})
