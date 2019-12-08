/**
 * https://www.mapbox.com/mapbox-gl-js/style-spec#layers
 */

import isEqual from 'lodash/isEqual'
import MglComponentMixin from './common/MglComponentMixin.js'
import { enumPropValidator } from '../util/index.js'

/**
 * MglLayer
 *
 * usage Example
 * <MglLayer :sourceId='someid'> // use external source
 */

export default {
  mixins: [MglComponentMixin],

  render() {
    return null
  },

  inject: ['getSourceId'],

  props: {
    id: {
      type: String,
      default() {
        return `mgl-layer-${this._uid}`
      },
    },
    type: {
      type: String,
      validator: enumPropValidator([
        'fill',
        'line',
        'symbol',
        'circle',
        'heatmap',
        'fill-extrusion',
        'raster',
        'hillshade',
        'background',
      ]),
    },
    metadata: {
      type: Object,
    },

    // source related
    sourceId: {
      type: String,
    },
    sourceLayer: String,

    // layer
    minzoom: Number,
    maxzoom: Number,
    filter: Array,
    paint: Object,
    layout: Object,

    // layer order
    before: String,
  },

  data() {
    return {
      ready: false,
    }
  },

  watch: {
    filter(val, oldVal) {
      if (!this.ready) return
      if (isEqual(val, oldVal)) return
      this.map.setFilter(this.id, val)
    },

    paint: {
      deep: true,
      handler: function(val, oldVal) {
        if (!this.ready) return
        for (let prop in val) {
          if (val[prop] !== oldVal[prop]) {
            this.map.setPaintProperty(this.id, prop, val[prop])
          }
        }
      },
    },

    layout: {
      deep: true,
      handler: function(val, oldVal) {
        if (!this.ready) return
        for (let prop in val) {
          if (this.layout[prop] !== oldVal[prop]) {
            this.map.setLayoutProperty(this.id, prop, val[prop])
          }
        }
      },
    },
  },

  computed: {
    finalSourceId() {
      // props
      if (this.sourceId) return this.sourceId

      // inject
      if (this.getSourceId && this.getSourceId) return this.getSourceId()

      throw new Error('sourceId empty for the layer')
    },

    // the layer
    layerEntity() {
      const layer = {
        id: this.id,
        type: this.type,
        source: this.finalSourceId,
      }

      if (this['source-layer']) layer['source-layer'] = this['source-layer']
      if (this.paint) layer.paint = this.paint
      if (this.layout) layer.layout = this.layout
      if (this.filter) layer.filter = this.filter
      if (this.maxzoom) layer.maxzoom = this.maxzoom
      if (this.minzoom) layer.minzoom = this.minzoom

      return layer
    },
  },

  beforeMount() {
    const { map, component } = this.__context()
    this.map = map
    this.init()
  },
  destroyed() {
    if (this.map.getLayer(this.id)) {
      this.map.removeLayer(this.id)
    }
  },

  methods: {
    init() {
      this._addLayer()
      this.ready = true
      this.$emit('ready')
    },

    _addLayer() {
      // clean
      if (this.map.getLayer(this.id)) {
        this.map.removeLayer(this.id)
      }

      // add
      this.map.addLayer(this.layerEntity, this.before)
    },
  },
}
