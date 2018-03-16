const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

module.exports = function getInputOptions({ cwd, pkg, minify }) {
  return {
    input: path.join(cwd, 'src/index.js'),
    external: pkg.zenflowConfig.build.externals,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        runtimeHelpers: false,
        presets: [
          [
            require.resolve('babel-preset-env'),
            {
              modules: false,
            },
          ],
          [require.resolve('babel-preset-react')],
        ],
        plugins: [
          require.resolve('babel-plugin-external-helpers'),
          require.resolve('babel-plugin-transform-object-rest-spread'),
          require.resolve('babel-plugin-transform-class-properties'),
        ],
        exclude: 'node_modules/**',
      }),
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
