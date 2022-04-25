import { useRange } from '@/hooks/useRange'
import { FC, useCallback, useRef, useState } from 'react'
import { usePlayerContext } from '../playerContext'
import styles from './volume.module.scss'

export const Volume: FC = () => {

  const { video } = usePlayerContext()
  const [volume, setVolume] = useState(0)
  const oldVolume = useRef(0)
  const bar = useRef<HTMLDivElement>(null)

  const iconClick = () => {
    if (!video.current) return
    if (oldVolume.current === volume) {
      video.current.volume = 0
      setVolume(0)
    } else {
      video.current.volume = oldVolume.current
      setVolume(oldVolume.current)
    }
  }

  const updateVolume = (e: any) => {
    if (!video.current || !bar.current) return
    const { offsetWidth } = bar.current
    const { offsetX } = e.nativeEvent

    const newVolume = Math.abs(+(1 / (offsetWidth / offsetX)).toFixed(1))
    if (volume === newVolume) return
    video.current.volume = newVolume
    setVolume(newVolume)
    oldVolume.current = newVolume
  }

  const range = useRange(updateVolume, bar)

  const renderIcon = useCallback(() => {
    if (volume > .5) return <i className="ph-speaker-simple-high-fill"></i>
    else if (volume > 0) return <i className="ph-speaker-simple-low-fill"></i>
    else return <i className="ph-speaker-simple-x-fill"></i>
  }, [volume])

  return (
    <div className={styles.volume}>
      <div onClick={iconClick}>
        {renderIcon()}
      </div>
      <div ref={bar} className={styles.bar} {...range}>
        <div className={styles.line +' '+ styles.main}></div>
        <div 
          className={styles.line +' '+ styles.active}
          style={{ width: (volume === 0 ? .1 : volume)*100 + '%' }}
        ></div>
      </div>
    </div>
  )
}