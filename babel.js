module.exports = {
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
}
