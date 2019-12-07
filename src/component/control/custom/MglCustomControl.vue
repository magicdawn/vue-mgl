<template lang="html">
  <div class="custom-control-wrapper" style="display: none;">
    <BaseControl v-if="ready" v-bind="baseControlProps" />
    <div ref="container" v-bind="containerProps"><slot></slot></div>
  </div>
</template>

<script>
import MglComponentMixin from '../../common/MglComponentMixin.js'
import BaseControl from '../BaseControl.js'

export default {
  mixins: [MglComponentMixin],
  components: { BaseControl },

  props: {
    position: {
      type: String,
    },

    containerProps: {
      type: Object,
    },
  },

  data() {
    return {
      ready: false,
    }
  },

  computed: {
    baseControlProps() {
      return {
        ControlType: this.ControlType,
        getOptions: () => null,
        position: this.position,
      }
    },

    ControlType() {
      const vm = this
      const $el = this.$el
      const $container = this.$refs.container

      return class MglCustomControlType {
        onAdd(map) {
          return $container
        }
        onRemove() {
          $el.appendChild($container)
        }
        getDefaultPosition() {
          return this.position || 'top-right'
        }
      }
    },
  },

  mounted() {
    this.ready = true
  },

  methods: {},
}
</script>

<style lang="css" scoped></style>
