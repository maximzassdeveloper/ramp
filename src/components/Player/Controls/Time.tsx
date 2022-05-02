import { convertTime } from '@/utils/convertTime'
import { FC, memo, useEffect, useState } from 'react'
import { usePlayerContext } from '../playerContext'
import styles from './controls.module.scss'

export const Time: FC = memo(() => {

  const [time, setTime] = useState(0)
  const { video, duration } = usePlayerContext()

  const onUpdateTime = (e: any) => {
    setTime(Math.round(e.target.currentTime))
  }

  useEffect(() => {
    video.current?.addEventListener('timeupdate', onUpdateTime)
    return () => {
      video.current?.removeEventListener('timeupdate', onUpdateTime)
    }
  }, [])

  return (
    <span className={styles.time}>
      {convertTime(time)} / {convertTime(duration)}
    </span>
  )
})