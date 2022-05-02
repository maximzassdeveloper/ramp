import { MutableRefObject, RefObject, useRef } from 'react'

export const useDrag = (sliderRef: RefObject<HTMLDivElement>, onUpdate: () => void) => {
  const offset = useRef(0)

  const onStartMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    e.stopPropagation()

    const { width, x: startX } = sliderRef.current.getBoundingClientRect()
    calcOffset(e, offset, width, startX, onUpdate)

    const onMouseMove = (ev: MouseEvent) => {
      ev.preventDefault()

      calcOffset(ev, offset, width, startX, onUpdate)
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
  offsetRef: MutableRefObject<number>,
  width: number,
  startX: number,
  onUpdate: () => void
) {
  const { pageX: moveX } = e
  const offsetX = moveX - startX

  let perc = offsetX / width
  perc = Math.floor(perc * 100)

  if (perc > 100) perc = 100
  if (perc < 0) perc = 0

  if (offsetRef.current !== perc) {
    offsetRef.current = perc
    onUpdate()
  }
  // if (!sliderRef.current) return

  // const { pageX: moveX } = e
  // let offsetX = moveX - startX

  // if (offsetX > width) offsetX = width
  // else if (offsetX < 0) offsetX = 0

  // if (offsetRef.current !== offsetX) {
  //   offsetRef.current = Math.floor(offsetX)
  //   onUpdate()
  // }
}