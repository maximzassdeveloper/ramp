export const ObjectIsEmpty = (obj: Object) => {
  if (Object.keys(obj).length == 0) {
    return true
  }
  return false
}