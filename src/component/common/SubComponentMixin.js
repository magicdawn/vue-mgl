import assert from 'assert'

export default {
  inject: ['getMapComponent'],

  props: {
    // the VueMapboxGl Vue instance
    mapComponent: {
      type: Object,
    },
  },

  methods: {
    // the current context
    __context() {
      const component = this.mapComponent || this.getMapComponent()
      assert(component, 'this component requires a MglMap context')
      const map = component.map
      assert(map, 'this component requires a MglMap context')
      return {map, component}
    },
  },
}
