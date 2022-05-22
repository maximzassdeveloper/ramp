import { FC, useEffect, memo, useState, useRef } from 'react'
import classNames from 'classnames'
import { ToggleIcon } from '@/components/generetic'
import { usePlayerContext } from '../playerContext'
import styles from './common.module.scss'

interface PlayButtonProps {
  center?: boolean
}

export const PlayButton: FC<PlayButtonProps> = memo(({ center }) => {

  const { isPlay, changePlay } = usePlayerContext()
  const [hidden, setHidden] = useState(false)
  const timeout = useRef<any>(null)

  const fadingButtonInaction = () => {
    if (!center) return

    setHidden(false)
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setHidden(true), 2000)
  }

  useEffect(() => {
    fadingButtonInaction()
  }, [isPlay, center])


  const classes = classNames(styles.playButton,
    {
      [styles.center]: center,
      [styles.hidden]: hidden && center,
    }
  )

  return (
    <div className={classes} onClick={() => changePlay()}>
      <ToggleIcon toggle={isPlay}><i className='ph-pause-fill'></i></ToggleIcon>
      <ToggleIcon toggle={!isPlay}><i className='ph-play-fill'></i></ToggleIcon>
    </div>
  )
})