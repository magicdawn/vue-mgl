import { pick, omit } from 'lodash'
import MglLayer from '../MglLayer.js'
import { propsRegistry } from '../MglSource.js'
import CompositionLayerMixin from './CompositionLayerMixin.js'

// sourceProps
// id, type, urls, coordiantes
// id override
// type = video
const propsFromSource = omit(propsRegistry.video, ['id', 'type'])

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
      return `mgl-video-layer-${this._uid}-source`
    },
  },

  ...propsFromLayer,
  id: {
    type: String,
    default() {
      return `mgl-video-layer-${this._uid}`
    },
  },
}

const createDeleteMethod = keys =>
  keys.reduce((obj, key) => {
    obj[key] = function(...args) {
      if (!this.map || !this.sourceReady) return

      const source = this.map.getSource(this.sourceId)
      if (!source) return

      return source[key](...args)
    }
    return obj
  }, {})

export default {
  mixins: [CompositionLayerMixin],
  props,
  computed: {
    sourceProps() {
      return {
        ...pick(this.$props, Object.keys(propsFromSource)),
        id: this.sourceId,
        type: 'video',
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

  mounted() {
    this.map = this.__context().map
  },

  methods: {
    // VideoSource
    // play() / pause() / seek() / getVideo
    ...createDeleteMethod(['play', 'pause', 'seek', 'getVideo']),
  },
}
