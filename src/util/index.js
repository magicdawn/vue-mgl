export function enumPropValidator(allow = []) {
  return function validator(val) {
    return allow.includes(val)
  }
}