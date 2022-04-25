import { createRef, useEffect } from 'react'

export const useClickOut = (onClickOut?: (e: MouseEvent) => void) => {

  const ref = createRef<any>()

  const clickOut = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClickOut?.(e)
    }
  }

  useEffect(() => {
    if (!ref.current) return
    window.addEventListener('click', clickOut)
    return () => {
      window.removeEventListener('click', clickOut)
    }
  }, [ref])

  return {
    ref,
    isOpen: true,
    setIsOpen: (bool: any) => null,
    sourceRef: null
  }
}