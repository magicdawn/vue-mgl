import { enumPropValidator } from '../../util/index.js'

export default {
  props: {
    location: {
      type: 'string',
      default: 'bottom-right',
      validator: enumPropValidator(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
    },
  },

  provide() {
    return {
      getLocation() {
        return this.location
      },
    }
  },
}
