import { RefObject, useRef } from 'react'

export const useDrag = (sliderRef: RefObject<HTMLDivElement>, step: number, onUpdate: () => void) => {
  const percents = useRef(0)

  const onStartMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    e.stopPropagation()

    const { width, x: startX } = sliderRef.current.getBoundingClientRect()

    const onMouseMove = (ev: MouseEvent) => {
      ev.preventDefault()

      const { pageX: moveX } = ev
      const offsetX = moveX - startX
      
      let perc = offsetX / width
      // perc = +(perc * 100).toFixed(1)
      perc = Math.floor(perc * 100)

      // if (step) perc = calcStepRound(perc, step)
      if (perc > 100) perc = 100
      if (perc < 0) perc = 0

      if (percents.current !== perc) {
        percents.current = perc
        onUpdate()
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
    percents
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