const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const slash = require('slash')
const moduleFormatPackageFields = require('./moduleFormatPackageFields')

module.exports = ({ cwd }) => {
  const pkg = require(path.join(cwd, './package.json'))
  return [false, true].map(minify => ({
    inputOptions: getInputOptions({ cwd, pkg, minify }),
    outputOptions: Object.keys(moduleFormatPackageFields).map(format =>
      getOutputOptions({ pkg, minify, format }),
    ),
  }))
}

function getInputOptions({ cwd, pkg, minify }) {
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

function getOutputOptions({ pkg, minify, format }) {
  const field = moduleFormatPackageFields[format]
  const file = slash(minify ? getMinifiedFile(pkg[field]) : pkg[field])
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
