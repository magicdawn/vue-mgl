// https://github.com/egoist/poi/blob/v12.0.0-alpha.4/packages/core/poi/lib/babel/preset.js

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        // https://www.chromium.org/developers/calendar
        // 1month + 发一个版本
        // 虽然打出来有 const/template string/
        // 支持两年前的应该可以了吧...
        targets: 'last 20 chrome versions',
      },
    ],
  ],
  plugins: [
    require('@babel/plugin-syntax-jsx'),
    require('babel-plugin-transform-vue-jsx'),
    require('@babel/plugin-syntax-dynamic-import'),
    [
      require('@babel/plugin-proposal-class-properties'),
      {
        // Enable loose mode to use assignment instead of defineProperty
        loose: true,
      },
    ],
    [
      require('@babel/plugin-proposal-object-rest-spread'),
      {
        useBuiltIns: true,
      },
    ],
    require('babel-plugin-lodash'),
  ],
}
