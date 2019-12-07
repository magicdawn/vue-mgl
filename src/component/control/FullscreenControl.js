import mgl from 'mapbox-gl'
import createBuiltInControlMixin from './builtInControl.js'

export default {
  name: 'MglFullscreenControl',
  mixins: [createBuiltInControlMixin(mgl.FullscreenControl)],

  props: {
    container: {
      type: HTMLElement,
    },
  },

  methods: {
    setUnit(...args) {
      return this.$children[0].control.setUnit(...args)
    },
  },
}
