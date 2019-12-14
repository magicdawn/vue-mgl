import { enumPropValidator } from '../../util/index.js'

export default {
  render(h) {
    return h(
      'div',
      {
        style: {
          visibility: 'hidden',
        },
      },
      this.$slots.default
    )
  },

  props: {
    position: {
      type: String,
      default: 'bottom-right',
      validator: enumPropValidator(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
    },
  },

  provide() {
    return {
      CONTEXT_POSITION: this.position,
    }
  },
}
