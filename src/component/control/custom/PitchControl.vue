<template lang="html">
  <CustomControl
    :position="position"
    :container-props="{class: 'mapboxgl-ctrl mapboxgl-ctrl-group'}"
  >
    <button
      class="mapboxgl-ctrl-icon mapboxgl-ctrl-pitch"
      aria-label="Pitch"
      type="button"
      @click="onClick"
    >
      {{ current }}
    </button>
  </CustomControl>
</template>

<script>
import SubComponentMixin from '../../common/SubComponentMixin.js'
import CustomControl from './CustomControl.vue'

export default {
  mixins: [SubComponentMixin],
  components: {CustomControl},

  props: {
    position: {
      type: String,
    },

    flyOptions: {
      type: Object,
      default() {
        return {
          maxDuration: 200,
        }
      },
    },
  },

  data() {
    return {
      // pitch所对应的额度数
      pitch: {
        '2d': 0,
        '3d': 60,
      },

      current: '2D',
    }
  },

  mounted() {
    this.map = this.__context().map
    this.setCurrent()
  },

  methods: {
    // set initial state
    setCurrent() {
      if (this.map.getPitch() === 0) {
        this.current = '2D'
      } else {
        this.current = '3D'
      }
    },

    onClick() {
      if (this.map.getPitch() === this.pitch['2d']) {
        this.to3d()
      } else {
        this.to2d()
      }
    },

    to3d() {
      this.current = '3D'
      this.map.flyTo({
        ...this.flyOptions,
        pitch: this.pitch['3d'],
      })
    },
    to2d() {
      this.current = '2D'
      this.map.flyTo({
        ...this.flyOptions,
        pitch: this.pitch['2d'],
      })
    },
  },
}
</script>

<style lang="css" scoped></style>
