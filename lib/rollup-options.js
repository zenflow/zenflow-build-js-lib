const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const filesize = require('rollup-plugin-filesize')
const slash = require('slash')

const minifyValues = [false, true]
const formatValues = ['cjs', 'es', 'umd']

module.exports = ({cwd}) => {
  const pkg = require(path.join(cwd, './package.json'))
  return minifyValues.map(minify => ({
    inputOptions: getInputOptions({ cwd, pkg, minify }),
    outputOptions: formatValues.map(format => getOutputOptions({ pkg, minify, format }))
  }))
}

function getInputOptions ({ cwd, pkg, minify }) {
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
        ],
        exclude: 'node_modules/**',
      }),
      ...(minify ? [uglify({
        output: {
          comments: (node, { type, value }) => type === 'comment2' // multiline comment
            ? /@preserve|@license|@cc_on/i.test(value)
            : false
        }
      })] : []),
      filesize()
    ],
  }
}

function getOutputOptions ({ pkg, minify, format }) {
  const packageFileField = format === 'cjs' ? 'main' : format === 'es' ? 'module' : format === 'umd' ? 'browser' : null
  const packageFile = pkg[packageFileField]
  const file = slash(minify ? getMinifiedFile(packageFile) : packageFile)
  const options = {
    format,
    file,
    sourcemap: true,
    banner: `\
/** @preserve
  * package: ${pkg.name} v${pkg.version}
  * file: ${file}
  * homepage: ${pkg.homepage}
  * license: ${pkg.license}
  **/`,
  }
  if (format === 'umd') {
    options.name = pkg.zenflowConfig.build.global
    options.globals = pkg.zenflowConfig.build.globals
  }
  return options
}

function getMinifiedFile(file) {
  return path.join(path.dirname(file), path.basename(file, '.js') + '.min.js')
}
