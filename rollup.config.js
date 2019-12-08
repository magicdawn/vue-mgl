const pkg = require('./package.json')
const vue = require('rollup-plugin-vue')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const buble = require('rollup-plugin-buble')

// require('rollup-plugin-nodent')({
//   sourcemap: true,
//   promises: true,
//   noRuntime: true,
//   wrapAwait: true,
// }),

module.exports = {
  input: 'src/index.js',
  output: [
    {
      name: 'VueMgl',
      file: pkg.browser,
      format: 'umd',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],

  external: ['mapbox-gl', 'vue'],
  plugins: [
    // vue({
    //   compileTemplate: true,
    // }),
    // babel({
    //   exclude: 'node_modules/**',
    //   extensions: ['.js,', '.jsx,', '.es6,', '.es,', '.mjs'],
    // }),
    // nodeResolve(),
    // commonjs(),

    vue({
      compileTemplate: true,
    }),
    buble({
      objectAssign: 'Object.assign',
      jsx: 'h',
      transforms: { dangerousForOf: true },
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
  ],
}
