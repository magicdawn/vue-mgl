const pkg = require('./package.json')
const vue = require('rollup-plugin-vue')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const buble = require('rollup-plugin-buble')

// require('rollup-plugin-nodent')({
//   sourcemap: true,
//   promises: true,
//   noRuntime: true,
//   wrapAwait: true,
// }),

module.exports = [
  // esm & cjs
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
      },
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
      },
    ],
    external: id => {
      if (['mapbox-gl', 'vue', 'assert'].includes(id)) return true
      return /^lodash-/.test(id)
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      vue({
        exclude: 'node_modules/**',
        include: ['src/**/*.vue'],
      }),
      commonjs({
        exclude: 'src/**',
      }),
      resolve({
        preferBuiltins: false,
      }),
    ],
  },

  // umd
]
