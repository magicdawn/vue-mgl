const pkg = require('./package.json')
const vue = require('rollup-plugin-vue')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const buble = require('rollup-plugin-buble')
const { terser } = require('rollup-plugin-terser')

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
        file: pkg.module.replace(/\.js$/, '.min.js'),
        format: 'esm',
        exports: 'named',
        plugins: [terser()],
      },
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: pkg.main.replace(/\.js$/, '.min.js'),
        format: 'cjs',
        exports: 'named',
        plugins: [terser()],
      },
    ],
    external: id => {
      if (['mapbox-gl', 'vue', 'assert'].includes(id)) return true
      return /^lodash\//.test(id)
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
  {
    input: 'src/index.js',
    output: [
      {
        name: 'VueMgl',
        file: pkg.umd,
        format: 'umd',
        exports: 'named',
        globals: {
          'vue': 'Vue',
          'mapbox-gl': 'mapboxgl',
        },
      },
      {
        name: 'VueMgl',
        file: pkg.umd.replace(/\.js$/, '.min.js'),
        format: 'umd',
        exports: 'named',
        globals: {
          'vue': 'Vue',
          'mapbox-gl': 'mapboxgl',
        },
        plugins: [terser()],
      },
    ],
    external: id => {
      if (['mapbox-gl', 'vue'].includes(id)) return true
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
]
