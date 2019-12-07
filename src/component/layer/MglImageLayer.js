import { pick, omit, isEqual } from 'lodash'
import MglComponentMixin from '../common/MglComponentMixin.js'
import MglLayer from './MglLayer.js'
import MglSource, { propsRegistry } from '../source/MglSource.js'

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
  mixins: [MglComponentMixin],

  render(h) {
    return (
      <MglSource
        {...{
          props: this.sourceProps,
          on: {
            ready: () => {
              this.sourceReady = true
            },
          },
        }}
      >
        <MglLayer
          {...{
            props: this.layerProps,
            on: {
              ready: () => {
                this.layerReady = true
              },
            },
          }}
        ></MglLayer>
      </MglSource>
    )
  },

  data() {
    return {
      sourceReady: false,
      layerReady: false,
    }
  },

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
      if (!this.sourceReady) return
      return this.map.getSource(this.sourceId).updateImage({ url: val })
    },
  },

  mounted() {
    this.map = this.__context().map
  },
}
