export const convertTime = (n?: number) => {
  if (!n) return '0:00'
  if (n < 0) n = 0
  let sec = n
  const hours = Math.floor(sec / 3600)
  if (hours > 0) sec -= hours*3600
  const min = Math.floor(sec / 60)
  if (min > 0) sec -= min*60
  sec = Math.floor(sec)

  if (!!hours) return `${hours}:${toTwo(min)}:${toTwo(sec)}`
  if (!!min) return `${min}:${toTwo(sec)}`
  return `0:${toTwo(sec)}`
}

export function toTwo(n: number) {
  return n.toString().length < 2 ? `0${n}` : n.toString()
}

export function formatTime(timeInSeconds: number) {
  if (!timeInSeconds || timeInSeconds === 0) return '0:00'

  const time = new Date(Math.round(timeInSeconds) * 1000).toISOString().slice(-13, -5)
  const hours = time.slice(0, 2)
  const min = time.slice(3, 5)
  const sec = time.slice(6,8)

  if (+hours[1] !== 0) return time
  if (+min[0] === 0 && +min[1] !== 0) return time.slice(4, 8)
  if (+min[1] !== 0) return time.slice(3, 8)
  return `0:${sec}`
}