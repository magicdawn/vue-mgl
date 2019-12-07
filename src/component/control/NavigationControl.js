import mgl from 'mapbox-gl'
import createBuiltInControlMixin from './builtInControl.js'

export default {
  name: 'MglNavigationControl',
  mixins: [createBuiltInControlMixin(mgl.NavigationControl)],

  props: {
    showCompass: {
      type: Boolean,
      default: true,
    },
    showZoom: {
      type: Boolean,
      default: true,
    },
  },
}
