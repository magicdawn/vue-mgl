<template>
  <div style="display: none;">
    <slot name="marker"></slot>
    <slot name="popup"></slot>
    <slot></slot>
  </div>
</template>

<script>
import mgl from 'mapbox-gl'
import MglComponentMixin from '../common/MglComponentMixin.js'

/**
 * https://www.mapbox.com/mapbox-gl-js/api#marker
 */

export default {
  mixins: [MglComponentMixin],

  props: {
    // marker
    coordinates: {
      type: [Array, Object],
      required: true,
    },

    // other marker options
    anchor: {
      type: String,
      default: 'center',
    },

    offset: {
      type: [Object, Array],
      default: () => [0, 0],
    },

    color: {
      type: String,
      default: '#3FB1CE',
    },

    draggable: {
      type: Boolean,
      default: false,
    },

    // Popup
    popupOptions: {
      type: Object,
    },
  },

  data() {
    return {
      ready: false,
      map: undefined,
      marker: undefined,
    }
  },

  computed: {
    // 兼容处理
    initial() {
      return !this.ready
    },
  },

  watch: {
    // marker position
    coordinates(val) {
      if (!this.ready) return
      if (!val) return
      this.marker.setLngLat(val)
    },

    // marker offset
    offset(val) {
      if (!this.ready) return
      if (!val) return
      if (this.marker.setOffset) {
        this.marker.setOffset(val)
      }
    },

    draggable(val) {
      if (!this.ready) return
      if (this.marker.setDraggable) {
        this.marker.setDraggable(val)
      }
    },
  },

  beforeDestroy() {
    if (this.marker) {
      this.marker.remove()
    }
    if (this.popup) {
      this.popup.remove()
    }
  },

  mounted() {
    const { map } = this.__context()
    this.map = map
    this.ready = false

    this._addMarker()
    this._addPopup()

    this.ready = true
    this.$emit('ready')
  },

  methods: {
    _addMarker() {
      // clean previous
      if (this.marker) {
        this.marker.remove()
      }

      const options = {
        anchor: this.anchor,
        offset: this.offset,
        color: this.color,
        draggable: this.draggable,
      }
      const el = this.$slots.marker && this.$slots.marker[0] && this.$slots.marker[0].elm
      if (el) {
        this.marker = new mgl.Marker(el, options)
      } else {
        this.marker = new mgl.Marker(options)
      }

      this.marker.setLngLat(this.coordinates).addTo(this.map)
    },

    _addPopup() {
      if (!this.$slots.popup || !this.$slots.popup.length) return

      // clean previous
      if (this.popup) {
        this.popup.remove()
        this.marker.setPopup(null)
      }

      const node = this.$slots.popup[0].elm
      this.popup = new mgl.Popup(this.popupOptions).setLngLat(this.coordinates).setDOMContent(node)

      // bind
      this.marker.setPopup(this.popup)
    },

    remove() {
      this.marker.remove()
    },

    togglePopup() {
      this.marker.togglePopup()
    },

    waitReady() {
      return new Promise(resolve => {
        if (this.ready) return resolve()
        this.$once('ready', resolve)
      })
    },
  },
}
</script>
