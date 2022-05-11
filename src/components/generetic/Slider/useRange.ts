import { closestBetweenNums, numTrim } from '@/utils/helper'
import { MutableRefObject, RefObject, useRef } from 'react'

export const useRange = (sliderRef: RefObject<HTMLDivElement>, onUpdate: (num: number) => void) => {
  const offset = useRef([0, 100])

  const onStartMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    e.stopPropagation()

    const { width, x: startX } = sliderRef.current.getBoundingClientRect()
    const { pageX: moveX } = e
    const offsetX = moveX - startX

    let perc = Math.floor(offsetX / width * 100)
    perc = numTrim(perc, 0, 100)


    const closest = closestBetweenNums(perc, offset.current[0], offset.current[1])
    // calcOffset(e, offset, width, startX, onUpdate)

    if (offset.current[closest] !== perc) {
      offset.current[closest] = perc
      // if (percStep > (offsetRef.current[1] - offsetRef.current[0])) return
      onUpdate(closest)
    }

    const onMouseMove = (ev: MouseEvent) => {
      ev.preventDefault()

      const { pageX: moveX } = ev
      const offsetX = moveX - startX

      let perc = Math.floor(offsetX / width * 100)
      // perc = calcStepRound(perc, percStep)
      perc = numTrim(perc, 0, 100)


      if (offset.current[closest] !== perc) {
        offset.current[closest] = perc
        // if (percStep > (offsetRef.current[1] - offsetRef.current[0])) return
        onUpdate(closest)
      }
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return {
    onStartMove,
    offset,
  }
}

function calcOffset(
  e: MouseEvent | React.MouseEvent,
  offsetRef: MutableRefObject<number[]>,
  width: number,
  startX: number,
  onUpdate: (num: number) => void
) {
  const { pageX: moveX } = e
  const offsetX = moveX - startX

  let perc = Math.floor(offsetX / width * 100)
  // perc = calcStepRound(perc, percStep)
  perc = numTrim(perc, 0, 100)

  const closest = closestBetweenNums(perc, offsetRef.current[0], offsetRef.current[1])


  if (offsetRef.current[closest] !== perc) {
    offsetRef.current[closest] = perc
    // if (percStep > (offsetRef.current[1] - offsetRef.current[0])) return
    onUpdate(closest)
  }
}

function calcStepRound(val: number, st: number): number {
  let newVal = val

  const remain = st - (val % st)
  if (remain <= st / 2) {
    newVal += remain
  } else {
    newVal -= val % st
  }

  return newVal
}