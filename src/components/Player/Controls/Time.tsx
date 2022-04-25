import { convertTime } from '@/utils/convertTime'
import { FC, memo } from 'react'
import styles from './controls.module.scss'

interface TimeProps {
  time: number
  duration: number
}

export const Time: FC<TimeProps> = memo(({ time, duration }) => {
  return (
    <span className={styles.time}>
      {convertTime(time)} / {convertTime(duration)}
    </span>
  )
})