// map
import MglMap from './component/MglMap/index.vue'
export {MglMap}

// mixin
import SubComponentMixin from './component/common/SubComponentMixin.js'
export {SubComponentMixin}

// control
import MglNavigationControl from './component/control/NavigationControl.js'
import MglGeolocateControl from './component/control/GeolocateControl.js'
import MglAttributionControl from './component/control/AttributionControl.js'
import MglScaleControl from './component/control/ScaleControl.js'
import MglFullscreenControl from './component/control/FullscreenControl.js'
export {
  MglNavigationControl,
  MglGeolocateControl,
  MglAttributionControl,
  MglScaleControl,
  MglFullscreenControl,
}

// custom control
import MglCustomControl from './component/control/custom/CustomControl.vue'
import MglPitchControl from './component/control/custom/PitchControl.vue'
import MglFlyToControl from './component/control/custom/FlyToControl.vue'
export {MglCustomControl, MglPitchControl, MglFlyToControl}

// ui control
import MglMarker from './component/ui/Marker.vue'
import MglPopup from './component/ui/Popup.vue'
export {MglMarker, MglPopup}

// source
import MglBaseLayer from './component/layer/BaseLayer.js'
import MglVideoLayer from './component/layer/VideoLayer.js'
import MglImageLayer from './component/layer/ImageLayer.js'

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

//
// // layer
// export const MglGeojsonLayer = GeojsonLayer
// export const MglImageLayer = ImageLayer
// export const MglCanvasLayer = CanvasLayer
// export const MglRasterLayer = RasterLayer
// export const MglTileLayer = TileLayer
// export const MglVectorlayer = Vectorlayer
// export const MglVideoLayer = VideoLayer
// export const MglPlayRasterLayer = PlayRasterLayer
//
//
// // inherit
// export const MglDraggableMarker = DraggableMarker
// export const MglFlyToControl = FlyToControl
// export const MglLineLayer = LineLayer
// export const MglVectorTrafficLayer = VectorTrafficLayer
// export const MglPolygon = Polygon
// export const MglBuildingLayer = BuildingLayer

/**
 * 全局组件
 */

const components = {
  MglMap,

  // control
  MglNavigationControl,
  MglGeolocateControl,
  MglAttributionControl,
  MglScaleControl,
  MglFullscreenControl,

  // custom control
  MglCustomControl,
  MglPitchControl,
  MglFlyToControl,

  // ui
  MglMarker,
  MglPopup,

  // source
  MglBaseLayer,
  MglVideoLayer,
  MglImageLayer,

  // MglPitchControl,
  // layer
  // MglGeojsonLayer,
  // MglImageLayer,
  // MglCanvasLayer,
  // MglRasterLayer,
  // MglTileLayer,
  // MglVectorlayer,
  // MglVideoLayer,
  // MglPlayRasterLayer,
  // ui
  // MglMarker,
  // MglMarkers,
  // MglMarkerCluster,
  // MglPopup,
  //
  // // inherit
  // MglDraggableMarker,
  // MglFlyToControl,
  // MglLineLayer,
  // MglVectorTrafficLayer,
  // MglPolygon,
  // MglBuildingLayer,
}

const VueMapboxGlPlugin = {
  install(Vue, options) {
    for (let id in components) {
      const C = components[id]
      Vue.component(id, C)
    }
  },
}
export default VueMapboxGlPlugin

// mgl I'm using
import mgl from 'mapbox-gl'
export {mgl}
