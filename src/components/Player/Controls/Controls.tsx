import { FC, useCallback, useEffect, useState } from 'react'
import { PlayButton } from '../common'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Volume } from '../Volume/Volume'
import { PlayerSettings } from '../Settings/PlayerSettings'
import { FullScreen, Time, PlayerSeasons } from '.'
import { usePlayerContext } from '../playerContext'
import s from './controls.module.scss'

export const Controls: FC = () => {

  const { video, duration } = usePlayerContext()
  const [time, setTime] = useState(0)
  // const [percents, setPercents] = useState(0)
  // const [loadedPercents, setLoadedPercents] = useState(0)

  const onTimeUpdate = useCallback(() => {
    if (!video.current) return
    // const { duration, currentTime } = video.current
    // setPercents(+(currentTime / (duration / 100)).toFixed(1))
    setTime(video.current.currentTime)
  }, [])

  // const onProgress = useCallback(() => {
  //   if (!video.current) return
  //   if (video.current.buffered.length <= 0) return
  //   setLoadedPercents(video.current.buffered.end(0) / video.current.duration * 100)
  // }, [])

  
  // Event Listeners
  useEffect(() => {
    if (!video.current) return

    // video.current.addEventListener('progress', onProgress)
    video.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      video.current?.removeEventListener('timeupdate', onTimeUpdate)
      // video.current?.removeEventListener('progress', onProgress)
    }
  }, [])

  return (
    <div className={s.controls}>
      <ProgressBar />
      <div className={s.controlsBottom}>
        <div className={s.col}>
          <PlayButton />
          <Time 
            time={time} 
            duration={duration} 
          />
          <Volume />
        </div>
        <div className={`${s.col} ${s.colSecond}`}>
          <PlayerSeasons />
          <PlayerSettings />
          <FullScreen />
        </div>
      </div>
    </div>
  )
}