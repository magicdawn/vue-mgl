import { pick, omit, isEqual } from 'lodash-es'
import MglLayer from '../MglLayer.js'
import MglSource, { propsRegistry } from '../MglSource.js'
import CompositionLayerMixin from './CompositionLayerMixin.js'

// sourceProps
// id, type, url, coordiantes
// id override
// type = image
const propsFromSource = omit(propsRegistry.image, ['id', 'type'])

// layerProps
// id override
// type=raster
// sourceId as self props
const propsFromLayer = omit(MglLayer.props, ['id', 'type', 'sourceId'])

const props = {
  ...propsFromSource,
  sourceId: {
    type: String,
    default() {
      return `mgl-image-layer-${this._uid}-source`
    },
  },

  ...propsFromLayer,
  id: {
    type: String,
    default() {
      return `mgl-image-layer-${this._uid}`
    },
  },
}

export default {
  mixins: [CompositionLayerMixin],
  props,

  computed: {
    sourceProps() {
      return {
        ...pick(this.$props, Object.keys(propsFromSource)),
        id: this.sourceId,
        type: 'image',
      }
    },

    layerProps() {
      return {
        ...pick(this.$props, Object.keys(propsFromLayer)),
        id: this.id,
        type: 'raster',
        sourceId: this.sourceId, // 不传, 使用 inject 也可以
      }
    },
  },

  watch: {
    url(val) {
      if (!this.map || !this.sourceReady) return
      return this.map.getSource(this.sourceId).updateImage({ url: val })
    },
  },

  mounted() {
    this.map = this.__context().map
  },
}
