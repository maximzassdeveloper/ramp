export const fileUrl = (name: string) => `${process.env.FILE_URL || ''}${name}`

export const ObjectIsEmpty = (obj: Object) => {
  if (Object.keys(obj).length == 0) {
    return true
  }
  return false
}

export const numTrim = (num: number, min: number, max: number) => {
  let val = num
  if (val > max) val = max
  if (val < min) val = min
  return val
}

export const numDiapozone = (num: number, min: number, max: number) => {
  return min <= num && num <= max
}

export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email: string): boolean {
  const re = emailRegExp
  return re.test(String(email).toLowerCase())
}

export const closestBetweenNums = (num: number, a: number, b: number): number => {
  const middle = Math.round((b - a) / 2 + a)
  if (num > middle) return 1
  else return 0
  // else return null
}