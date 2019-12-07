import mgl from 'mapbox-gl'
import {pick} from 'lodash'
import SubComponentMixin from '../common/SubComponentMixin.js'

const BaseControl = {
  mixins: [SubComponentMixin],

  render() {
    return null
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
      default: 'top-right',
      validator: value => {
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
      },
    },
  },

  mounted() {
    const {map, component} = this.__context()
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
