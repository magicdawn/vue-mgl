import mgl from 'mapbox-gl'
import createBuiltInControlMixin from './builtInControl.js'

export default {
  name: 'MglAttributionControl',
  mixins: [createBuiltInControlMixin(mgl.AttributionControl)],

  props: {
    compact: {
      type: Boolean,
    },
    customAttribution: {
      type: [String, Array],
    },
  },
}
