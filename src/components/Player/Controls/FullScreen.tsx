import { FC, useState } from 'react'
import { usePlayerContext } from '../playerContext'

export const FullScreen: FC = () => {

  const { playerRef } = usePlayerContext()
  const [isFull, setIsFull] = useState(false)

  const clickHandler = () => {  
    setIsFull(!isFull)
    const el: any = playerRef.current

    if (!isFull) {
      if (el.requestFullscreen) {
        el.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <div onClick={clickHandler}>
      {!isFull 
        ? <i className="ph-corners-out"></i>
        : <i className="ph-corners-in"></i>
      }
    </div>
  )
}