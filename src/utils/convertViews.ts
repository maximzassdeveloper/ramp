export const convertViews = (count: number): string => {
  if (count < 0) {
    return '0'
  } else if (count < 1000) {
    return count.toString()
  } else if (count <= 100000) {
    return (count / 1000).toFixed(2).toString().slice(0, -1).replace('.0', '') + 'k'
  } else {
    return '100k+'
  }
}
