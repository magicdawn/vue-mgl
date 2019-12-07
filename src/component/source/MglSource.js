import { omit } from 'lodash'
import { enumPropValidator } from '../../util/index.js'
import MglComponentMixin from '../common/MglComponentMixin.js'

export const geojsonOnlyProps = {
  // data
  // A URL to a GeoJSON file, or inline GeoJSON.
  data: {
    type: [String, Object],
  },

  buffer: {
    type: Number,
  },

  tolerance: {
    type: Number,
  },

  cluster: {
    type: Boolean,
  },

  clusterRadius: {
    type: Number,
  },

  clusterMaxZoom: {
    type: Number,
  },

  clusterProperties: {
    type: Object,
  },

  lineMetrics: {
    type: Boolean,
  },

  generateId: {
    type: Boolean,
  },
}

const MglSource = {
  mixins: [MglComponentMixin],

  render(h) {
    return h('div', this.$slots.default)
  },

  props: {
    id: {
      type: String,
      default: () => `mgl-source-${this.type}-${this._uid}`,
    },

    type: {
      type: String,
      required: true,
      validator: enumPropValidator(['vector', 'raster', 'raster-dem', 'geojson', 'image', 'video']),
    },

    url: {
      type: String,
    },

    tiles: {
      type: Array,
    },

    // "type": "raster", Defaults to 512
    tileSize: {
      type: Number,
    },

    bounds: {
      type: Array,
    },

    scheme: {
      type: String,
      validator: enumPropValidator(['tms', 'xyz']),
    },

    minzoom: {
      type: Number,
    },

    maxzoom: {
      type: Number,
    },

    attribution: {
      type: String,
    },

    // type=raster-dem only
    // https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources-raster-dem-encoding
    // Optional enum. One of "terrarium", "mapbox". Defaults to "mapbox".
    encoding: {
      type: String,
    },

    ...geojsonOnlyProps,

    /**
     * image & video
     *
     * image: url & coordiantes
     * video: urls & coordiantes
     */
    coordiantes: {
      type: Array,
    },

    urls: {
      type: Array,
    },
  },

  computed: {},

  watch: {
    coordinates: {
      deep: true,
      handler(val) {
        if (!val) return
        this.getSource().setCoordinates(val)
      },
    },

    data: {
      deep: true,
      handler(val) {
        if (!val) return
        this.getSource().setData(val)
      },
    },
  },

  beforeMount() {
    const { map } = this.__context()
    this.add()
  },
  destroyed() {
    this.remove()
  },

  methods: {
    getSource() {
      if (!this.map) return
      return this.map.getSource(this.id)
    },

    add() {
      if (!this.map) return
      const source = omit(this.$props, ['id'])
      this.map.addSource(this.id, source)
    },
    remove() {
      if (!this.map) return
      if (this.getSource(this.id)) {
        this.removeSource(this.id)
      }
    },
  },
}

export default MglSource
