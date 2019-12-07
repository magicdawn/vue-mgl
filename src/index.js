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
import MglNavigationControl from './component/control/MglNavigationControl.js'
import MglGeolocateControl from './component/control/MglGeolocateControl.js'
import MglAttributionControl from './component/control/MglAttributionControl.js'
import MglScaleControl from './component/control/MglScaleControl.js'
import MglFullscreenControl from './component/control/MglFullscreenControl.js'
export {
  MglNavigationControl,
  MglGeolocateControl,
  MglAttributionControl,
  MglScaleControl,
  MglFullscreenControl,
}
globalify({
  MglNavigationControl,
  MglGeolocateControl,
  MglAttributionControl,
  MglScaleControl,
  MglFullscreenControl,
})

// custom control
import MglMglCustomControl from './component/control/custom/MglCustomControl.vue'
import MglPitchControl from './component/control/custom/MglPitchControl.vue'
import MglFlyToControl from './component/control/custom/MglFlyToControl.vue'
export { MglMglCustomControl, MglPitchControl, MglFlyToControl }
globalify({ MglMglCustomControl, MglPitchControl, MglFlyToControl })

// ui control
import MglMarker from './component/ui/MglMarker.vue'
import MglPopup from './component/ui/MglPopup.vue'
export { MglMarker, MglPopup }
globalify({ MglMarker, MglPopup })

// source
import MglSource from './component/source/MglSource.js'
import MglLayer from './component/layer/MglLayer.js'
export { MglSource, MglLayer }
globalify({ MglSource, MglLayer })

// simple layer
import MglVideoLayer from './component/layer/MglVideoLayer.js'
import MglImageLayer from './component/layer/MglImageLayer.js'
export { MglVideoLayer, MglImageLayer }
globalify({ MglVideoLayer, MglImageLayer })

// complex layer

// import GeojsonLayer from './components/layer/GeojsonLayer.js'
// import ImageLayer from './components/layer/ImageLayer.vue'
// import CanvasLayer from './components/layer/CanvasLayer.vue'
// import RasterLayer from './components/layer/RasterLayer.vue'
// import TileLayer from './components/layer/TileLayer.js'
// import VideoLayer from './components/layer/VideoLayer.vue'
// import Vectorlayer from './components/layer/VectorLayer'
//
// import PlayRasterLayer from './components/inherit/PlayRasterLayer.vue'
// import DraggableMarker from './components/inherit/DraggableMarker.vue'
// import LineLayer from './components/inherit/LineLayer.vue'
// import VectorTrafficLayer from './components/inherit/VectorTrafficLayer.js'
// import Polygon from './components/inherit/Polygon.vue'
// import BuildingLayer from './components/inherit/BuildingLayer'
//

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
