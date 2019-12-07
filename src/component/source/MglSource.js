import { omit, pick } from 'lodash'
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

const props = {
  id: {
    type: String,
    default() {
      return `mgl-source-${this.type}-${this._uid}`
    },
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
   * image: url & coordinates
   * video: urls & coordinates
   */
  coordinates: {
    type: Array,
  },

  urls: {
    type: Array,
  },
}

const commonPropKeys = ['id', 'type']
const selectProps = arr => pick(props, [...commonPropKeys, ...arr])
export const propsRegistry = {
  'image': selectProps(['url', 'coordinates']),
  'video': selectProps(['urls', 'coordinates']),
  'vector': selectProps([
    'url',
    'tiles',
    'bounds',
    'minzoom',
    'maxzoom',
    'tileSize',
    'scheme',
    'attribution',
  ]),
  'raster': selectProps([
    'url',
    'tiles',
    'bounds',
    'minzoom',
    'maxzoom',
    'tileSize',
    'scheme',
    'attribution',
  ]),
  'raster-dem': selectProps([
    'url',
    'tiles',
    'bounds',
    'minzoom',
    'maxzoom',
    'tileSize',
    'attribution',
    'encoding',
  ]),
  'geojson': selectProps([
    // only + extra
    ...Object.keys(geojsonOnlyProps),
    'maxzoom',
    'attribution',
  ]),
}

export default {
  name: 'MglSource',

  mixins: [MglComponentMixin],

  // for composition
  // <MglSource>
  //   <MglLayer />
  // </MglSource>
  render(h) {
    return this.$slots.default
  },
  provide() {
    return {
      getSourceId: this.getSourceId,
    }
  },

  data() {
    return {
      ready: false,
    }
  },

  props,

  watch: {
    // image & video
    coordinates: {
      deep: true,
      handler(val) {
        if (!val || !this.ready) return
        this.getSource().setCoordinates(val)
      },
    },

    // geojson data
    data: {
      deep: true,
      handler(val) {
        if (!val || !this.ready) return
        this.getSource().setData(val)
      },
    },
  },

  beforeMount() {
    const { map } = this.__context()
    this.map = map
    this.add()
  },
  destroyed() {
    this.remove()
  },

  methods: {
    // context
    getSourceId() {
      return this.id
    },

    getSource() {
      if (!this.map) return
      return this.map.getSource(this.id)
    },

    add() {
      if (!this.map) return
      const sourceKeys = Object.keys(omit(propsRegistry[this.type], ['id']))
      const source = pick(this.$props, sourceKeys)
      this.map.addSource(this.id, source)

      this.ready = true
      this.$emit('ready')
    },
    remove() {
      if (!this.map || !this.map.getSource(this.id)) return
      this.map.removeSource(this.id)
    },
  },
}
