import Vue from 'vue'
const Observer = new Vue().$data.__ob__.constructor

export default function preventObserve(val) {
  if (val) {
    // Set dummy observer on value
    Object.defineProperty(val, '__ob__', {
      value: new Observer({}),
      enumerable: false,
      configurable: true,
    })
  }

  return val
}
