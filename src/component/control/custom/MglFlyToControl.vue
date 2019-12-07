<template lang="html">
  <MglCustomControl
    :position="position"
    :container-props="{ class: 'mapboxgl-ctrl mapboxgl-ctrl-group' }"
  >
    <button
      class="mapboxgl-ctrl-icon mapboxgl-ctrl-reset-view mapboxgl-ctrl-geolocate"
      aria-label="Reset view"
      type="button"
      @click="onClick"
    >
      <span class="mapboxgl-ctrl-icon" aria-hidden="true"></span>
    </button>
  </MglCustomControl>
</template>

<script>
import MglComponentMixin from '../../common/MglComponentMixin.js'
import MglCustomControl from './MglCustomControl.vue'

/**
 * purpose: 点击按钮恢复到一个自定义的 *初始状态*
 */

export default {
  mixins: [MglComponentMixin],
  components: { MglCustomControl },

  props: {
    position: {
      type: String,
    },

    // use `CameraOptions`
    camera: {
      type: Object,
    },

    // use `fitBounds`
    bounds: {
      type: [Array, Object],
    },

    // both `flyTo` & `fitBounds`
    flyOptions: {
      type: Object,
    },
  },

  data() {
    return {
      initialCamera: null,
    }
  },

  mounted() {
    this.map = this.__context().map
    if (!this.view) {
      this.initialCamera = {
        zoom: this.map.getZoom(),
        center: this.map.getCenter(),
        bearing: this.map.getBearing(),
        pitch: this.map.getPitch(),
      }
    }
  },

  methods: {
    onClick() {
      if (this.camera) {
        return this.map.flyTo({
          ...this.flyOptions,
          ...this.camera,
        })
      }

      if (this.bounds) {
        return this.map.fitBounds(this.bounds, this.flyOptions)
      }

      if (this.initialCamera) {
        return this.map.flyTo({
          ...this.flyOptions,
          ...this.initialCamera,
        })
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
