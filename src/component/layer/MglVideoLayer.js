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
      // TODO
      // if (!this.ready) return
      // return this.map.getSource(this.sourceId).updateImage({ url: val })
    },
  },

  mounted() {
    this.map = this.__context().map
  },

  methods: {
    getVideo() {
      if (!this.sourceReady) return
      return this.map.getSource(this.sourceId).getVideo()
    },
  },
}
