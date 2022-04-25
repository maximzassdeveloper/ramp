import { FC, useState, useRef, useEffect } from 'react'
import { Slider2 } from '@/components/generetic'
import { usePlayerContext } from '../playerContext'
import styles from './bar.module.scss'
import { PreviewThumb } from './PreviewThumb'

export const ProgressBar: FC = () => {

  const { video, changePlay, isPlay, duration } = usePlayerContext()
  const [time, setTime] = useState(0)
  const [bufferedPercents, setBufferedPercents] = useState(0)
  const isLocalPlay = useRef(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const changeSlider = (val: number) => {
    if (!video.current) return

    if (video.current.currentTime !== val) {
      video.current.currentTime = val
      setTime(val)
    }
  }

  const onTimeUpdate = () => {
    if (!video.current) return
    setTime(Math.floor(video.current.currentTime))
  }

  const onProgress = () => {
    if (!video.current) return
    if (video.current.buffered.length <= 0) return
    setBufferedPercents(video.current.buffered.end(0) / duration * 100)
  }

  const onMouseDown = () => {
    isLocalPlay.current = isPlay ? true : false
    changePlay(false)
  }

  const onMouseUp = () => {
    isLocalPlay.current ? changePlay(true) : null
  }

  useEffect(() => {
    if (!video.current) return

    video.current.addEventListener('timeupdate', onTimeUpdate)
    video.current.addEventListener('progress', onProgress)

    return () => {
      video.current?.removeEventListener('timeupdate', onTimeUpdate)
      video.current?.removeEventListener('progress', onProgress)
    }
  }, [])

  return (
    <div className={styles.bar}>

      <PreviewThumb 
        video={video}
        slider={sliderRef}
        duration={duration}
      />

      <Slider2 
        ref={sliderRef}
        className={styles.progresSlider}
        value={time}
        max={duration}
        min={0}
        showLabel={false}
        styles={styles}
        onChange={changeSlider}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        addonAfter={<div 
          className={styles.buffered}
          style={{ width: `${bufferedPercents}%` }}
        />}
      />

    </div>
  )
}