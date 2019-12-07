import mgl from 'mapbox-gl'
import {pick, omit} from 'lodash'
import BaseControl from './BaseControl.js'

export const commonKeys = Object.keys(BaseControl.props).filter(k => BaseControl.props[k].common)
export const commonProps = pick(BaseControl.props, commonKeys)
export const commonPropsValue = $props => pick($props, commonKeys)

export default function createBuiltInControlMixin(ControlType) {
  return {
    props: {
      ...commonProps,
    },

    methods: {
      getOptions() {
        return omit(this.$props, commonKeys)
      },
    },

    render(h) {
      return h(BaseControl, {
        props: {
          ControlType,
          getOptions: this.getOptions,
          ...commonPropsValue(this.$props),
        },
        on: this.$listeners,
      })
    },
  }
}
