import { RefObject, useEffect, useState } from 'react'

export const useRange = (onChange?: (e?: any) => void, barRef?: RefObject<any>) => {
  if (!onChange) return {}
  const [isMouseDown, setIsMouseDown] = useState(false)

  const refCheck = (e: MouseEvent) => {
    if (barRef?.current && !barRef.current.contains(e.target)) {
      setIsMouseDown(false)
    }
  }

  useEffect(() => {
    if (!barRef?.current) return
    window.addEventListener('mousemove', refCheck)
    return () => window.removeEventListener('mousemove', refCheck)
  }, [barRef])

  const onMouseMove = (e: any) => {
    if (!isMouseDown) return
    onChange(e)
  }

  const onClick = (e: any) => onChange(e)

  const onMouseDown = (e: any) => setIsMouseDown(true)
  const onMouseUp = (e: any) => setIsMouseDown(false)

  return {
    onClick,
    onMouseMove,
    onMouseDown,
    onMouseUp
  }
}