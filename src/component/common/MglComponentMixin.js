import { simpleAssert as assert } from '../../util/index.js'

export default {
  inject: {
    getMapComponent: {
      default: () => null,
    },
  },

  props: {
    // the MglMap component instance
    mapComponent: {
      type: Object,
    },
  },

  methods: {
    // the current context
    __context() {
      // check map & component
      const msg = 'this component requires a MglMap context'
      const component = this.mapComponent || this.getMapComponent()
      const map = component && component.map
      assert(component, 'this component requires a MglMap context')
      assert(map, 'this component requires a MglMap context')

      return { map, component }
    },
  },
}
