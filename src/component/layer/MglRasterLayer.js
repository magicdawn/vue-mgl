import { pick, omit, flow, mapKeys, upperFirst } from 'lodash'
import MglLayer from '../MglLayer.js'
import { propsRegistry } from '../MglSource.js'
import CompositionLayerMixin from './CompositionLayerMixin.js'

const renameZoom = prefix => props =>
  mapKeys(props, (v, k) => {
    if (!['minzoom', 'maxzoom'].includes(k)) return k
    return `${prefix}${upperFirst(k)}`
  })
const restoreZoomValue = prefix => obj =>
  mapKeys(obj, (v, k) => {
    if (k === `${prefix}Minzoom`) return 'minzoom'
    if (k === `${prefix}Maxzoom`) return 'maxzoom'
    return k
  })

// sourceProps
// source.id will be sourceId
// type = raster
const propsFromSource = flow(
  // omit
  props => omit(props, ['id', 'type']),
  // rename
  // minzoom => sourceMinzoom
  // maxzoom => sourceMaxzoom
  renameZoom('source')
)(propsRegistry.raster)

// layerProps
// id override
// type=raster
// sourceId as self props
const propsFromLayer = flow(
  // omit
  props => omit(props, ['id', 'type', 'sourceId']),
  // rename
  renameZoom('layer')
)(MglLayer.props)

const props = {
  ...propsFromSource,
  sourceId: {
    type: String,
    default() {
      return `mgl-raster-layer-${this._uid}-source`
    },
  },

  ...propsFromLayer,
  id: {
    type: String,
    default() {
      return `mgl-raster-layer-${this._uid}`
    },
  },
}

export default {
  mixins: [CompositionLayerMixin],

  props,
  computed: {
    sourceProps() {
      return {
        ...flow(
          // pick
          obj => pick(obj, Object.keys(propsFromSource)),
          // restore
          restoreZoomValue('source')
        )(this.$props),

        id: this.sourceId,
        type: 'raster',
      }
    },
    layerProps() {
      return {
        ...flow(
          // pick
          obj => pick(obj, Object.keys(propsFromLayer)),
          // restore
          restoreZoomValue('layer')
        )(this.$props),
        id: this.id,
        type: 'raster',
        sourceId: this.sourceId, // 不传, 使用 inject 也可以
      }
    },
  },
}
