# CHANGELOG

## v0.4.0 2020-01-15

- add more options for `MglMap` & `MglMarker` according to mapbox-gl js doc
- clean up legacy code
- make `MglMap` style `width` & `height` => `100%`
- make `yarn dist` use `NODE_ENV=production`, so `rollup-plugin-vue` do not include css source-map

## v0.3.0 2019-12-15

- add `MglControlGroup`
- add `MglPolygon`
- add readd logic to `MglSource` when map change theme(reset style),
  only `MglSource` have this, and `MglLayer` should be wrapped in a `MglSource`

## v0.2.2 2019-12-13

- remove `assert` module & use `simpleAssert` to reduce bundle size

## v0.2.1 2019-12-13

- fix(MglLayer): fix unintend typo

## v0.2.0 2019-12-13

- export `util` too
- add events support to `MglLayer`, this is nice, with original event names

## v0.1.1 2019-12-09

- change @babel/preset-env targets to `last 20 chrome versions`

## v0.1.0 2019-12-09

- first usable release

## v0.0.1 2019-12-04

- first release to take the package
