<template>
  <MglSource :id="sourceId" type="geojson" :data="geojson">
    <MglLayer key="border" v-if="hasBorder" v-bind="borderLayer" />
    <MglLayer key="fill" v-if="hasFill" v-bind="fillLayer" />
  </MglSource>
</template>

<script>
import MglSource from '../MglSource.js'
import MglLayer from '../MglLayer.js'

export default {
  components: { MglSource, MglLayer },

  props: {
    // data
    sourceId: {
      type: String,
      default() {
        return `${this.layerKey || `mgl-polygon-${this._uid}`}-source`
      },
    },

    geojson: {
      type: Object,
    },
    filter: Array,

    // border
    borderColor: String,
    borderWidth: Number,
    borderPaint: Object,
    borderLayout: Object,

    // fill
    fillColor: String,
    fillOpacity: Number,
    fillPaint: Object,
    fillLayout: Object,

    // mglProps 透传给 mgl-layer 的属性
    mglProps: Object,

    // layer 标识
    layerKey: {
      type: String,
      default() {
        return `mgl-polygon-${this._uid}`
      },
    },
  },

  computed: {
    hasBorder() {
      return this.borderColor || this.borderWidth || this.borderPaint || this.borderLayout
    },

    hasFill() {
      return this.fillColor || this.fillOpacity || this.fillPaint || this.fillLayout
    },

    borderLayer() {
      return {
        ...this.mglProps,
        id: this.layerKey + '-border-layer',
        type: 'line',
        sourceId: this.sourceId,
        filter: this.filter,
        layout: this.borderLayout,
        paint: {
          'line-color': this.borderColor,
          'line-width': this.borderWidth,
          ...this.borderPaint,
        },
      }
    },
    fillLayer() {
      return {
        ...this.mglProps,
        id: this.layerKey + '-fill-layer',
        type: 'fill',
        sourceId: this.sourceId,
        filter: this.filter,
        layout: this.fillLayout,
        paint: {
          'fill-color': this.fillColor,
          'fill-opacity': this.fillOpacity,
          ...this.fillPaint,
        },
      }
    },
  },
}
</script>
