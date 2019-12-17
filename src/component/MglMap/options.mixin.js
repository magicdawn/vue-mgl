// https://www.mapbox.com/mapbox-gl-js/api/#map

import { isEqual } from 'lodash'

export default {
  props: {
    container: {
      type: [String, HTMLElement],
    },
    minZoom: {
      type: Number,
      default: 0,
    },
    maxZoom: {
      type: Number,
      default: 22,
    },

    minPitch: {
      type: Number,
      default: 0,
    },
    maxPitch: {
      type: Number,
      default: 60,
    },

    // [Vue warn]: "style" is a reserved attribute and cannot be used as component prop.
    mapStyle: {
      type: [String, Object],
      required: true,
      default: () => null,
    },

    hash: {
      type: Boolean,
      default: false,
    },

    interactive: {
      type: Boolean,
      default: true,
    },

    bearingSnap: {
      type: Number,
      default: 7,
    },

    pitchWithRotate: {
      type: Boolean,
      default: true,
    },

    clickTolerance: {
      type: Number,
      default: 3,
    },

    attributionControl: {
      type: Boolean,
      default: true,
    },

    customAttribution: {
      type: [String, Array],
    },

    logoPosition: {
      type: String,
      default: 'bottom-left',
    },

    failIfMajorPerformanceCaveat: {
      type: Boolean,
      default: false,
    },

    preserveDrawingBuffer: {
      type: Boolean,
      default: false,
    },

    antialias: {
      type: Boolean,
      default: false,
    },

    refreshExpiredTiles: {
      type: Boolean,
      default: true,
    },

    maxBounds: {
      type: Array,
    },

    /**
     * interactive handler
     */

    scrollZoom: {
      type: [Boolean, Object],
      default: true,
    },
    boxZoom: {
      type: Boolean,
      default: true,
    },
    dragRotate: {
      type: Boolean,
      default: true,
    },
    dragPan: {
      type: Boolean,
      default: true,
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
    doubleClickZoom: {
      type: Boolean,
      default: true,
    },
    touchZoomRotate: {
      type: [Boolean, Object],
      default: true,
    },
    trackResize: {
      type: Boolean,
      default: true,
    },

    /**
     * view
     */

    center: {
      type: [Array, Object],
      default: () => [0, 0],
    },
    zoom: {
      type: Number,
      default: 0,
    },
    bearing: {
      type: Number,
      default: 0,
    },
    pitch: {
      type: Number,
      default: 0,
    },

    bounds: {
      type: [Array, Object],
    },
    fitBoundsOptions: {
      type: Object,
    },

    /**
     * other
     */

    renderWorldCopies: {
      type: Boolean,
      default: true,
    },
    maxTileCacheSize: {
      type: Number,
      default: null,
    },
    localIdeographFontFamily: {
      type: String,
      default: null,
    },
    transformRequest: {
      type: Function,
      default: null,
    },
    collectResourceTiming: {
      type: Boolean,
      default: false,
    },
    fadeDuration: {
      type: Number,
      default: 300,
    },
    crossSourceCollisions: {
      type: Boolean,
      default: true,
    },

    accessToken: {
      type: String,
    },

    locale: {
      type: String,
    },
  },

  watch: {
    zoom(val, old) {
      if (!this.ready) return
      if (isEqual(val, old)) return
      this.map.setZoom(val)
    },
    center(val, old) {
      if (!this.ready) return
      if (isEqual(val, old)) return
      this.map.setCenter(val)
    },
    bearing(val, old) {
      if (!this.ready) return
      if (isEqual(val, old)) return
      this.map.setBearing(val)
    },
    pitch(val, old) {
      if (!this.ready) return
      if (isEqual(val, old)) return
      this.map.setPitch(val)
    },

    minZoom(zoom) {
      if (!this.ready) return
      this.map.setMinZoom(zoom)
    },
    maxZoom(zoom) {
      if (!this.ready) return
      this.map.setMaxZoom(zoom)
    },
    maxBounds(bounds) {
      if (!this.ready) return
      this.map.setMaxBounds(bounds)
    },
  },
}
