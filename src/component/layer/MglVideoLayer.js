import { pick, omit, isEqual } from 'lodash'
import MglComponentMixin from '../common/MglComponentMixin.js'
import MglLayer from './MglLayer.js'
import MglSource, { propsRegistry } from '../source/MglSource.js'

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
  mixins: [MglComponentMixin],

  render(h) {
    return (
      <MglSource {...{ props: this.sourceProps }}>
        <MglLayer {...{ props: this.layerProps }}></MglLayer>
      </MglSource>
    )
  },

  data() {
    return {
      ready: false,
    }
  },

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

  watch: {
    urls(val) {
      if (!this.ready) return
      // TODO: update video urls
      // no avialable methods
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
