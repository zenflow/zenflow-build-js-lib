module.exports = {
  runtimeHelpers: false,
  presets: [
    [
      require('babel-preset-env'),
      {
        modules: false,
      },
    ],
    [require('babel-preset-react')],
  ],
  plugins: [
    require('babel-plugin-external-helpers'),
    require('babel-plugin-transform-object-rest-spread'),
    require('babel-plugin-transform-class-properties'),
  ],
  exclude: 'node_modules/**',
}
