const { MglMap } = require('../../')
const { shallowMount } = require('@vue/test-utils')

describe('MglMap', function() {
  const wrapper = shallowMount(MglMap, {
    propsData: {
      center: [0, 0],
      zoom: 10,
    },
  })

  wrapper.html().should.ok()
})
