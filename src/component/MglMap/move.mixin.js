/**
 * map move related
 */

export default {
  methods: {
    _catchMoveFabric(eventData, resolve, reject) {
      let self = this
      return function catchMove(options) {
        if (options.eventId !== eventData.eventId) return
        let newCenter = self.map.getCenter()
        self.$emit('update:center', newCenter)
        self.map.off('moveend', catchMove)
        return resolve({
          eventData,
          center: newCenter,
        })
      }
    },

    _catchZoomFabric(eventData, resolve, reject) {
      let self = this
      return function catchZoom(options) {
        if (options.eventId !== eventData.eventId) return
        let newZoom = self.map.getZoom()
        self.$emit('update:zoom', newZoom)
        self.map.off('zoomend', catchZoom)
        return resolve({
          eventData,
          zoom: newZoom,
        })
      }
    },

    _catchRotateFabric(eventData, resolve, reject) {
      let self = this
      return function catchRotate(options) {
        if (options.eventId !== eventData.eventId) return
        let newBearing = self.map.getBearing()
        self.$emit('update:bearing', newBearing)
        self.map.off('rotate', catchRotate)
        resolve({
          eventData,
          bearing: newBearing,
        })
      }
    },

    _catchPitchFabric(eventData, resolve, reject) {
      let self = this
      return function catchPitch(options) {
        if (options.eventId !== eventData.eventId) return
        let newPitch = self.map.getPitch()
        self.$emit('update:pitch', newPitch)
        self.map.off('pitch', catchPitch)
        resolve({
          eventData,
          pitch: newPitch,
        })
      }
    },

    panBy(offset, options = undefined) {
      if (offset[0] === 0 && offset[1] === 0) {
        return new Promise((resolve, reject) =>
          resolve({
            center: this.map.getCenter(),
          })
        )
      }
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `panBy-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('moveend', this._catchMoveFabric(eventData, resolve, reject))
        this.map.panBy(offset, options, eventData)
      })
    },

    panTo(coordinates, options = undefined) {
      if (!(coordinates instanceof Array)) {
        coordinates = coordinates.toArray()
      }
      if (coordinates[0] === 0 && coordinates[1] === 0) {
        return new Promise((resolve, reject) =>
          resolve({
            center: this.map.getCenter(),
          })
        )
      }
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `panTo-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('moveend', this._catchMoveFabric(eventData, resolve, reject))
        this.map.panTo(coordinates, options, eventData)
      })
    },

    zoomTo(zoom, options = undefined) {
      if (zoom === this.map.getZoom()) {
        return new Promise((resolve, reject) =>
          resolve({
            zoom: this.map.getZoom(),
          })
        )
      }
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `zoomTo-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('zoomend', this._catchZoomFabric(eventData, resolve, reject))
        this.map.zoomTo(zoom, options, eventData)
      })
    },

    zoomIn(options = undefined) {
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `zoomIn-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('zoomend', this._catchZoomFabric(eventData, resolve, reject))
        this.map.zoomIn(options, eventData)
      })
    },

    zoomOut(options = undefined) {
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `zoomOut-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('zoomend', this._catchZoomFabric(eventData, resolve, reject))
        this.map.zoomOut(options, eventData)
      })
    },

    rotateTo(bearing, options = undefined) {
      if (bearing === this.map.getBearing()) {
        return new Promise((resolve, reject) =>
          resolve({
            bearing: this.map.getBearing(),
          })
        )
      }
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `rotateTo-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('rotate', this._catchRotateFabric(eventData, resolve, reject))
        this.map.rotateTo(bearing, options, eventData)
      })
    },

    resetNorth(options = undefined) {
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `resetNorth-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('rotate', this._catchRotateFabric(eventData, resolve, reject))
        this.map.resetNorth(options, eventData)
      })
    },

    snapToNorth(options = undefined) {
      return new Promise((resolve, reject) => {
        let eventData = {
          eventId: `snapToNorth-${('' + Math.random()).split('.')[1]}`,
        }
        this.map.on('rotate', this._catchRotateFabric(eventData, resolve, reject))
        this.map.snapToNorth(options, eventData)
      })
    },

    fitBounds(bounds, options = undefined) {
      if (bounds === this.map.getBounds()) {
        return new Promise((resolve, reject) =>
          resolve({
            bounds: this.map.getBounds(),
          })
        )
      }
      let eventData = {
        eventId: `fitBounds-${('' + Math.random()).split('.')[1]}`,
      }
      // let zoomFunc = new Promise((resolve, reject) => {
      //     this.map.on('zoomend', this._catchZoomFabric(eventData, resolve, reject))
      // })

      // let moveFunc = new Promise((resolve, reject) => {
      //     this.map.on('moveend', this._catchMoveFabric(eventData, resolve, reject))
      // })
      this.map.fitBounds(bounds, options, eventData)
      // return Promise.all([zoomFunc, moveFunc]).then(results => {
      //     return {
      //         eventData,
      //         bounds: this.map.getBounds()
      //     }
      // })
      return new Promise((resolve, reject) => {
        resolve({
          eventData,
          bounds: this.map.getBounds(),
        })
      })
    },

    jumpTo(options) {
      let eventData = {
        eventId: `jumpTo-${('' + Math.random()).split('.')[1]}`,
      }
      let funcs = []
      if (options.bearing !== undefined && options.bearing !== this.map.getBearing()) {
        let rotateFunc = new Promise((resolve, reject) => {
          this.map.on('rotate', this._catchRotateFabric(eventData, resolve, reject))
        })
        funcs.push(rotateFunc)
      }
      if (options.zoom !== undefined && options.zoom !== this.map.getZoom()) {
        let zoomFunc = new Promise((resolve, reject) => {
          this.map.on('zoomend', this._catchZoomFabric(eventData, resolve, reject))
        })
        funcs.push(zoomFunc)
      }
      if (options.center !== undefined && options.center !== this.map.getCenter()) {
        let centerFunc = new Promise((resolve, reject) => {
          this.map.on('moveend', this._catchMoveFabric(eventData, resolve, reject))
        })
        funcs.push(centerFunc)
      }
      if (options.pitch !== undefined && options.pitch !== this.map.getPitch()) {
        let pitchFunc = new Promise((resolve, reject) => {
          this.map.on('pitch', this._catchPitchFabric(eventData, resolve, reject))
        })
        funcs.push(pitchFunc)
      }
      if (funcs.length === 0) {
        return new Promise((resolve, reject) => {
          resolve({
            pitch: this.map.getPitch(),
            zoom: this.map.getZoom(),
            center: this.map.getCenter(),
            bearing: this.map.getBearing(),
          })
        })
      }
      this.map.jumpTo(options, eventData)

      return Promise.all(funcs).then(results => {
        let resObj = {}
        for (let res of results) {
          Object.assign(resObj, res)
        }
        return {
          eventData,
          ...resObj,
        }
      })
    },

    easeTo(options) {
      let funcs = []
      let eventData = {
        eventId: `easeTo-${('' + Math.random()).split('.')[1]}`,
      }
      if (options.bearing !== undefined && options.bearing !== this.map.getBearing()) {
        let rotateFunc = new Promise((resolve, reject) => {
          this.map.on('rotate', this._catchRotateFabric(eventData, resolve, reject))
        })
        funcs.push(rotateFunc)
      }
      if (options.zoom !== undefined && options.zoom !== this.map.getZoom()) {
        let zoomFunc = new Promise((resolve, reject) => {
          this.map.on('zoomend', this._catchZoomFabric(eventData, resolve, reject))
        })
        funcs.push(zoomFunc)
      }
      if (options.center !== undefined && options.center !== this.map.getCenter()) {
        let centerFunc = new Promise((resolve, reject) => {
          this.map.on('moveend', this._catchMoveFabric(eventData, resolve, reject))
        })
        funcs.push(centerFunc)
      }
      if (options.pitch !== undefined && options.pitch !== this.map.getPitch()) {
        let pitchFunc = new Promise((resolve, reject) => {
          this.map.on('pitch', this._catchPitchFabric(eventData, resolve, reject))
        })
        funcs.push(pitchFunc)
      }
      if (funcs.length === 0) {
        return new Promise((resolve, reject) => {
          resolve({
            pitch: this.map.getPitch(),
            zoom: this.map.getZoom(),
            center: this.map.getCenter(),
            bearing: this.map.getBearing(),
          })
        })
      }
      this.map.easeTo(options, eventData)

      return Promise.all(funcs).then(results => {
        // console.log('RESULTS: ', results)
        let resObj = {}
        for (let res of results) {
          Object.assign(resObj, res)
        }
        return {
          eventData,
          ...resObj,
        }
      })
    },

    flyTo(options) {
      let eventData = {
        eventId: `flyTo-${('' + Math.random()).split('.')[1]}`,
      }
      let funcs = []
      if (options.bearing !== undefined && options.bearing !== this.map.getBearing()) {
        let rotateFunc = new Promise((resolve, reject) => {
          this.map.on('rotate', this._catchRotateFabric(eventData, resolve, reject))
        })
        funcs.push(rotateFunc)
      }
      if (options.zoom !== undefined && options.zoom !== this.map.getZoom()) {
        let zoomFunc = new Promise((resolve, reject) => {
          this.map.on('zoomend', this._catchZoomFabric(eventData, resolve, reject))
        })
        funcs.push(zoomFunc)
      }
      if (options.center !== undefined && options.center !== this.map.getCenter()) {
        let centerFunc = new Promise((resolve, reject) => {
          this.map.on('moveend', this._catchMoveFabric(eventData, resolve, reject))
        })
        funcs.push(centerFunc)
      }
      if (options.pitch !== undefined && options.pitch !== this.map.getPitch()) {
        let pitchFunc = new Promise((resolve, reject) => {
          this.map.on('pitch', this._catchPitchFabric(eventData, resolve, reject))
        })
        funcs.push(pitchFunc)
      }
      if (funcs.length === 0) {
        return new Promise((resolve, reject) => {
          resolve({
            pitch: this.map.getPitch(),
            zoom: this.map.getZoom(),
            center: this.map.getCenter(),
            bearing: this.map.getBearing(),
          })
        })
      }
      this.map.flyTo(options, eventData)
      return Promise.all(funcs).then(results => {
        let resObj = {}
        for (let res of results) {
          Object.assign(resObj, res)
        }
        return {
          eventData,
          ...resObj,
        }
      })
    },

    stop() {
      this.map.stop()
      this.$emit('update:pitch', this.map.getPitch())
      this.$emit('update:zoom', this.map.getZoom())
      this.$emit('update:bearing', this.map.getBearing())
      this.$emit('update:center', this.map.getCenter())
    },
  },
}
