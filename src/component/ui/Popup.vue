<template lang="html">
  <div class="mgl-popup-container" v-show="show"><slot></slot></div>
</template>

<script>
import mgl from 'mapbox-gl'
import SubComponentMixin from '../common/SubComponentMixin.js'

export default {
  mixins: [SubComponentMixin],

  data() {
    return {
      ready: false,
    }
  },

  props: {
    // 位置
    lnglat: [Array, Object],

    // 展示
    show: {
      type: Boolean,
      default: false,
    },

    // 其他选项
    options: Object,
  },

  watch: {
    lnglat(val) {
      if (!this.ready) return
      this.popup.setLngLat(val)
    },

    show() {
      if (!this.ready) return
      if (this.show) this.showPopup()
      else this.hidePopup()
    },
  },

  beforeDestroy() {
    if (this.popup) {
      this.popup.remove()
    }
  },

  mounted() {
    const {map} = this.__context()
    this.map = map
    this.init()
    this.ready = true
  },

  methods: {
    init() {
      this.popup = new mgl.Popup({
        closeOnClick: false,
        ...this.options,
      })
      this.popup.setDOMContent(this.$el)
      this.popup.setLngLat(this.lnglat)

      // initial
      if (this.show) {
        this.showPopup()
      }
    },

    showPopup() {
      if (this.popup.isOpen()) return
      // show
      this.popup.addTo(this.map)
    },

    hidePopup() {
      if (!this.popup.isOpen()) return
      // hide
      this.popup.remove()
    },
  },
}
</script>

<style lang="css"></style>
