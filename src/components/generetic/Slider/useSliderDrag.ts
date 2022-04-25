import { RefObject, useRef } from 'react'


export const useDrag = (updateValue: (who: number) => void, sliderRef: RefObject<any>, step: number, isRange: boolean) => {
  const percents = useRef(0) // First Handler
  const percents2 = useRef(100) // Second Handler

  const onStartMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    e.stopPropagation()

    const { width, x: startX } = sliderRef.current.getBoundingClientRect()

    const onMouseMove = (ev: MouseEvent) => {
      ev.preventDefault()

      const { pageX: moveX } = ev
      const offsetX = moveX - startX
      
      let perc = offsetX / width
      perc = Math.round(perc * 100)

      if (step) perc = calcStepRound(perc, step)
      if (perc > 100) perc = 100
      if (perc < 0) perc = 0

      if (isRange) {
        // Find which handler is closer
        const closest = isClosest(percents.current, percents2.current, perc)
        if (!closest) return
        if (closest === 1 && percents.current !== perc) {
          percents.current = perc
          updateValue(1)
        }
        if (closest === 2 && percents2.current !== perc) {
          percents2.current = perc
          updateValue(2)
        }
      } else {
        if (percents.current !== perc) {
          percents.current = perc
          updateValue(1)
        }
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
    percents,
    percents2
  }
}

function calcStepRound (val: number, st: number): number {
  let newVal = val

  const remain = st - (val % st)
  if (remain <= st / 2) {
    newVal += remain
  } else {
    newVal -= val % st
  }

  return newVal
}

function isClosest (num1: number, num2: number, source: number): number | null {
  if (source > num2) {
    return 2
  } else if (source < num1) {
    return 1
  } else if (source > num1 && source < num2) {
    const middle = Math.round((num2 - num1) / 2 + num1)
    return source > middle ? 2 : 1
  } else {
    return null
  }
}