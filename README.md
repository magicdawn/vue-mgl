# vue-mgl

> mapbox-gl vue components (map, layers, sources, controls)

[![Build Status](https://img.shields.io/travis/magicdawn/vue-mgl.svg?style=flat-square)](https://travis-ci.org/magicdawn/vue-mgl)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/vue-mgl.svg?style=flat-square)](https://codecov.io/gh/magicdawn/vue-mgl)
[![npm version](https://img.shields.io/npm/v/vue-mgl.svg?style=flat-square)](https://www.npmjs.com/package/vue-mgl)
[![npm downloads](https://img.shields.io/npm/dm/vue-mgl.svg?style=flat-square)](https://www.npmjs.com/package/vue-mgl)
[![npm license](https://img.shields.io/npm/l/vue-mgl.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ npm i vue-mgl --save
```

### builds

| file                       | field            | desc                                  | externals                    |
| -------------------------- | ---------------- | ------------------------------------- | ---------------------------- |
| `dist/vue-mgl.esm.js`      | `package.module` | es module build                       | external all dependencies    |
| `dist/vue-mgl.common.js`   | `package.main`   | commonjs build                        | external all dependencies    |
| `dist/vue-mgl-full.umd.js` | `package.umd`    | browser build, for `<script src>` use | external `mapbox-gl` & `vue` |

## API

### use global `mgl-*` component

```js
import VueMgl from 'vue-mgl'
import Vue from 'vue'
Vue.use(VueMgl) // this will add MglMap ... global components
```

### manual import

```js
import { MglMap, MglSource, MglLayer } from 'vue-mgl'

export default {
  // ...
  components: { MglMap, MglSource, MglLayer },
  // ...
}
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
