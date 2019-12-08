import MglComponentMixin from '../common/MglComponentMixin.js'
import MglLayer from '../MglLayer.js'
import MglSource from '../MglSource.js'

export default {
  mixins: [MglComponentMixin],

  render(h) {
    debugger
    return (
      <MglSource
        {...{
          props: this.sourceProps,
          on: {
            ready: () => {
              this.sourceReady = true
              this.$emit('source-ready')
            },
          },
        }}
      >
        <MglLayer
          {...{
            props: this.layerProps,
            on: {
              ready: () => {
                this.layerReady = true
                this.$emit('layer-ready')
              },
            },
          }}
        />
      </MglSource>
    )
  },

  data() {
    return {
      sourceReady: false,
      layerReady: false,
    }
  },
}
