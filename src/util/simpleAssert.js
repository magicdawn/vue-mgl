export default function simpleAssert(cond, message) {
  if (!cond) {
    throw new Error(message)
  }
}
