import { pick, mapValues, without, get } from 'lodash'
import MglComponentMixin from './common/MglComponentMixin.js'
import { enumPropValidator } from '../util/index.js'

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
      const type = this.type || get(this, '$options.propsData.type') || 'unknown'
      return `mgl-source-${type}-${this._uid}`
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
const selectProps = arr => pick(props, arr)

export const propKeysRegistry = {
  'image': [...commonPropKeys, 'url', 'coordinates'],
  'video': [...commonPropKeys, 'urls', 'coordinates'],
  'vector': [
    ...commonPropKeys,
    'url',
    'tiles',
    'bounds',
    'minzoom',
    'maxzoom',
    'tileSize',
    'scheme',
    'attribution',
  ],
  'raster': [
    ...commonPropKeys,
    'url',
    'tiles',
    'bounds',
    'minzoom',
    'maxzoom',
    'tileSize',
    'scheme',
    'attribution',
  ],
  'raster-dem': [
    ...commonPropKeys,
    'url',
    'tiles',
    'bounds',
    'minzoom',
    'maxzoom',
    'tileSize',
    'attribution',
    'encoding',
  ],
  'geojson': [
    ...commonPropKeys,
    // only + extra
    ...Object.keys(geojsonOnlyProps),
    'maxzoom',
    'attribution',
  ],
}
export const propsRegistry = mapValues(propKeysRegistry, keys => selectProps(keys))

/**
 * get prop keys by source.type
 */
export const getPropKeys = type => propKeysRegistry[type]

/**
 * get prop by source.type
 */
export const getProps = type => propsRegistry[type]

export default {
  name: 'MglSource',

  mixins: [MglComponentMixin],

  // for composition
  // <MglSource>
  //   <MglLayer />
  // </MglSource>
  render(h) {
    // do not render child when source not added
    if (!this.ready) return null

    // single or no child
    if (this.$slots.default && this.$slots.default.length <= 1) {
      return this.$slots.default
    }

    // multi child
    return h(
      'div',
      {
        class: 'mgl-source',
        style: { visibility: 'hidden' },
      },
      this.$slots.default
    )
  },

  provide() {
    return {
      CONTEXT_SOURCE_ID: this.id,
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

  // parent-beforeMount -> child-beforeMount
  // child-destroyed -> parent-destroyed
  beforeMount() {
    const { map, component } = this.__context()
    this.map = map
    this.component = component

    // first add
    this.add()

    // add when map reset style load success
    this.component.$on('style-load', this.add)
  },

  destroyed() {
    this.remove()
    this.component && this.component.$off && this.component.$off('style-load', this.add)
  },

  methods: {
    getSource() {
      if (!this.map) return
      return this.map.getSource(this.id)
    },

    add() {
      if (!this.map) return
      const sourceKeys = without(getPropKeys(this.type), 'id')
      const source = pick(this.$props, sourceKeys)
      for (let k of Object.keys(source)) {
        if (typeof source[k] === 'undefined') delete source[k]
      }

      this.ready = false
      this.map.addSource(this.id, source)

      // let vue destroy child and recreate
      this.$nextTick(() => {
        this.ready = true
        this.$emit('ready')
      })
    },
    remove() {
      if (!this.map || !this.map.getSource(this.id)) return
      this.map.removeSource(this.id)
    },
  },
}
