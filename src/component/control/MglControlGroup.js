import { enumPropValidator } from '../../util/index.js'

export default {
  render(h) {
    // single or no child
    if (this.$slots.default && this.$slots.default.length <= 1) {
      return this.$slots.default
    }

    // multi child
    return h(
      'div',
      { class: 'mgl-control-group', style: { visibility: 'hidden' } },
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
