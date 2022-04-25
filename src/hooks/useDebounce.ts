import { useCallback, useRef } from 'react'

export const useDebounce = (callback: (...args: any) => void, delay: number) => {

  const time = useRef<any>(null)

  const debounceHandler = useCallback((...args) => {
    if (time.current) {
      clearTimeout(time.current)
    }

    time.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay])

  return debounceHandler

}