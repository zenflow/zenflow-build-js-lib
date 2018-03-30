const path = require('path')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

module.exports = function getInputOptions({ cwd, config, minify }) {
  return {
    input: path.join(cwd, 'src/index.js'),
    external: config.externals,
    plugins: [
      babel(config.babel),
      nodeResolve({
        main: true,
      }),
      commonjs(),
      ...(minify
        ? [
            uglify({
              output: {
                comments: (node, { type, value }) =>
                  type === 'comment2' // multiline comment
                    ? /@preserve|@license|@cc_on/i.test(value)
                    : false,
              },
            }),
          ]
        : []),
    ],
  }
}
