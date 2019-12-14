export const globalComponents = {}
const globalify = obj => Object.assign(globalComponents, obj)

// map
import MglMap from './component/MglMap/index.vue'
export { MglMap }
globalify({ MglMap })

// mixin
import MglComponentMixin from './component/common/MglComponentMixin.js'
export { MglComponentMixin }
globalify({ MglComponentMixin })

// control
import MglControlGroup from './component/control/MglControlGroup.js'
import MglNavigationControl from './component/control/MglNavigationControl.js'
import MglGeolocateControl from './component/control/MglGeolocateControl.js'
import MglAttributionControl from './component/control/MglAttributionControl.js'
import MglScaleControl from './component/control/MglScaleControl.js'
import MglFullscreenControl from './component/control/MglFullscreenControl.js'
export {
  MglControlGroup,
  MglNavigationControl,
  MglGeolocateControl,
  MglAttributionControl,
  MglScaleControl,
  MglFullscreenControl,
}
globalify({
  MglControlGroup,
  MglNavigationControl,
  MglGeolocateControl,
  MglAttributionControl,
  MglScaleControl,
  MglFullscreenControl,
})

// custom control
import MglCustomControl from './component/control/custom/MglCustomControl.vue'
import MglPitchControl from './component/control/custom/MglPitchControl.vue'
import MglFlyToControl from './component/control/custom/MglFlyToControl.vue'
export { MglCustomControl, MglPitchControl, MglFlyToControl }
globalify({ MglCustomControl, MglPitchControl, MglFlyToControl })

// ui control
import MglMarker from './component/ui/MglMarker.vue'
import MglPopup from './component/ui/MglPopup.vue'
export { MglMarker, MglPopup }
globalify({ MglMarker, MglPopup })

// source
import MglSource from './component/MglSource.js'
import MglLayer from './component//MglLayer.js'
export { MglSource, MglLayer }
globalify({ MglSource, MglLayer })

// simple layer
import MglVideoLayer from './component/layer/MglVideoLayer.js'
import MglImageLayer from './component/layer/MglImageLayer.js'
import MglRasterLayer from './component/layer/MglRasterLayer.js'
import MglPolygon from './component/layer/MglPolygon.vue'
export { MglVideoLayer, MglImageLayer, MglRasterLayer, MglPolygon }
globalify({ MglVideoLayer, MglImageLayer, MglRasterLayer, MglPolygon })

// complex layer
// source + layer combination
//
// raster-source + raster-layer
// vector-source/geojson-source + mgl-layer(type=fill/line/symbol/...

/**
 * 全局组件
 */
const VueMapboxGlPlugin = {
  install(Vue, options) {
    for (let id in globalComponents) {
      const C = globalComponents[id]
      Vue.component(id, C)
    }
  },
}
export default VueMapboxGlPlugin

// mgl I'm using
import mgl from 'mapbox-gl'
export { mgl }

// util
import * as util from './util/index.js'
export { util }
