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

const pluginsFromDemo = [
  vue({
    compileTemplate: true,
  }),
  buble({
    objectAssign: 'Object.assign',
    jsx: 'h',
    transforms: { dangerousForOf: true },
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  commonjs(),
]

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

  external: id => {
    if (['mapbox-gl', 'vue'].includes(id)) return true
    return /lodash/.test(id)
  },

  plugins: [
    babel({
      // configfile: __dirname + '/babel.config.js',
      // ...require('./babel.config.js'),
      // include: 'src/**/*.js',
      exclude: 'node_modules/**',
    }),
    vue({
      exclude: 'node_modules/**',
      include: ['src/**/*.vue'],
    }),
    commonjs({
      exclude: 'src/**',
    }),
    resolve(),
  ],
}
