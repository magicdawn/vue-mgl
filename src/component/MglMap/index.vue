<template>
  <div class="mgl-map-wrapper" ref="container">
    <div class="more" v-if="ready"><slot></slot></div>
  </div>
</template>

<script>
import mgl from 'mapbox-gl'
import Vue from 'vue'
import { isEqual, pick } from 'lodash-es'
import preventObserve from '../../util/preventObserve.js'

// part
import OptionsMixin from './options.mixin.js'
import MoveMixin from './move.mixin.js'

export default {
  mixins: [OptionsMixin],
  provide() {
    return {
      getMapComponent: this.getMapComponent,
    }
  },

  data() {
    return {
      ready: false,
      map: null,
    }
  },

  watch: {
    mapStyle(val) {
      // set to map
      if (!this.ready) return
      this.map.setStyle(val)

      // https://github.com/mapbox/mapbox-gl-js/blob/v0.42.2/src/ui/map.js#L919
      // https://github.com/mapbox/mapbox-gl-js/blob/v0.42.2/src/style/style.js#L230
      this.map.style.once('style.load', () => {
        this.$emit('style-load')
      })
    },
  },

  mounted() {
    this.createMap()
  },

  destroyed() {
    if (this.map) this.map.remove()
  },

  methods: {
    getMap() {
      return this.map
    },
    getMapComponent() {
      return this
    },

    createMap() {
      const optionsKeys = Object.keys(OptionsMixin.props)
      const options = pick(this.$props, optionsKeys)

      // container
      if (!options.container) options.container = this.$refs.container

      // style
      options.style = options.mapStyle
      delete options.mapStyle

      const map = new mgl.Map(options)
      preventObserve(map)
      this.map = map

      map.on('load', () => {
        this.setupUpdateProps()

        this.ready = true
        this.$emit('ready')
        this.$emit('load', { map, component: this })
      })

      map.on('error', err => {
        this.$emit('error', err)
        if (!this.$listeners.error) {
          console.error(err.error.message || err.error.stack)
        }
      })
    },

    setupUpdateProps() {
      this.map.on('moveend', event => {
        this.$emit('update:center', this.map.getCenter())
      })
      this.map.on('zoomend', event => {
        this.$emit('update:zoom', this.map.getZoom())
      })
      this.map.on('rotate', event => {
        this.$emit('update:bearing', this.map.getBearing())
      })
      this.map.on('pitch', event => {
        this.$emit('update:pitch', this.map.getPitch())
      })
    },
  },
}
</script>

<style lang="less"></style>
