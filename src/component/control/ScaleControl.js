import mgl from 'mapbox-gl'
import createBuiltInControlMixin from './builtInControl.js'

export default {
  name: 'MglScaleControl',
  mixins: [createBuiltInControlMixin(mgl.ScaleControl)],

  props: {
    maxWidth: {
      type: Number,
    },

    // Unit of the distance ( 'imperial' ,  'metric' or  'nautical' ).
    unit: {
      type: String,
    },
  },

  methods: {
    setUnit(...args) {
      return this.$children[0].control.setUnit(...args)
    },
  },
}
