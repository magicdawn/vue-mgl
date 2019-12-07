import mgl from 'mapbox-gl'
import createBuiltInControlMixin from './builtInControl.js'

export default {
  name: 'MglGeolocateControl',
  mixins: [createBuiltInControlMixin(mgl.GeolocateControl)],

  props: {
    positionOptions: {
      type: Object,
      default: () => ({ enableHighAccuracy: false, timeout: 6000 }),
    },
    fitBoundsOptions: {
      type: Object,
      default: () => ({ maxZoom: 15 }),
    },
    trackUserLocation: {
      type: Boolean,
      default: false,
    },
    showUserLocation: {
      type: Boolean,
      default: true,
    },
  },
}
