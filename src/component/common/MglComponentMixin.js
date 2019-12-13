import { simpleAssert as assert } from '../../util/index.js'

export default {
  inject: ['getMapComponent'],

  props: {
    // the MglMap component instance
    mapComponent: {
      type: Object,
    },
  },

  methods: {
    // the current context
    __context() {
      const msg = 'this component requires a MglMap context'

      // inject works
      assert(this.getMapComponent, msg)

      // check map & component
      const component = this.mapComponent || this.getMapComponent()
      const map = component && component.map
      assert(component, 'this component requires a MglMap context')
      assert(map, 'this component requires a MglMap context')

      return { map, component }
    },
  },
}
