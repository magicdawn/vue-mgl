import omit from 'lodash/omit'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import MglComponentMixin from '../common/MglComponentMixin.js'
import MglLayer from './MglLayer.js'

export default {
  mixins: [MglComponentMixin],

  render(h) {
    return h(MglLayer, {
      props: this.layer,
      on: {
        ...this.$listeners,
        ready: () => {
          this.ready = true
          this.$emit('ready')
        },
      },
    })
  },

  data() {
    return {
      ready: false,
    }
  },

  props: {
    ...omit(MglLayer.props, ['type']),
    id: {
      ...MglLayer.props.id,
      default() {
        return `mgl-image-layer-${this._uid}`
      },
    },
    sourceId: {
      ...MglLayer.props.sourceId,
      default() {
        return `mgl-image-layer-source-${this._uid}`
      },
    },

    // image specific
    // https://docs.mapbox.com/mapbox-gl-js/style-spec#sources-image
    url: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
    },
  },

  computed: {
    layer() {
      return {
        ...pick(this.$props, Object.keys(MglLayer.props)),
        type: 'raster',
        source: {
          type: 'image',
          url: this.url,
          coordinates: this.coordinates,
        },
      }
    },
  },

  watch: {
    coordinates(val, old) {
      if (isEqual(val, old)) return
      if (!this.ready) return
      return this.map.getSource(this.sourceId).setCoordinates(val)
    },

    url(val) {
      if (!this.ready) return
      return this.map.getSource(this.sourceId).updateImage({ url: val })
    },
  },

  mounted() {
    this.map = this.__context().map
  },
}
