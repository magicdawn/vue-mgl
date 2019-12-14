import mgl from 'mapbox-gl'
import { pick } from 'lodash'
import MglComponentMixin from '../common/MglComponentMixin.js'

const BaseControl = {
  mixins: [MglComponentMixin],

  render() {
    return null
  },

  // inject if default not provided & inject not found
  // Vue will have warn
  inject: {
    CONTEXT_POSITION: {
      default: null,
    },
  },

  props: {
    ControlType: {
      type: Function,
    },

    getOptions: {
      type: Function,
    },

    position: {
      common: true,
      type: String,
      default() {
        return this.CONTEXT_POSITION || 'top-right'
      },
      validator: value => {
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
      },
    },
  },

  mounted() {
    const { map, component } = this.__context()
    this.map = map

    const options = this.getOptions()
    const control = new this.ControlType(options)
    map.addControl(control, this.position)

    // for delegate methods
    this.control = control

    for (let event in this.$listeners) {
      control.on(event, (...args) => {
        this.$emit(event, ...args)
      })
    }

    this.$once('hook:beforeDestroy', () => {
      map.removeControl(control)
      for (let event in this.$listeners) {
        control.off(event)
      }
    })
  },
}
export default BaseControl
