import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { usePlayerContext } from '../../playerContext'
import { Slider } from '@/components/generetic'
import styles from './volume.module.scss'

export const Volume: FC = memo(() => {

  const { video } = usePlayerContext()
  const [volume, setVolume] = useState(0)
  const oldVolume = useRef(0)

  const onIconClick = () => {
    if (!video.current) return

    if (volume === 0) {
      video.current.volume = oldVolume.current
    } else {
      oldVolume.current = volume
      video.current.volume = 0
    }
  }

  const onSliderChange = (val: number) => {
    if (!video.current) return
    video.current.volume = val / 100
  }

  const volumeChangeListener = (e: any) => {
    setVolume(e.target.volume)
  }

  useEffect(() => {
    video.current?.addEventListener('volumechange', volumeChangeListener)
    return () => {
      video.current?.removeEventListener('volumechange', volumeChangeListener)
    }
  }, [])

  const renderIcon = useCallback(() => {
    if (volume > .5) return <i className='ph-speaker-simple-high-fill' />
    else if (volume > 0) return <i className='ph-speaker-simple-low-fill' />
    else return <i className='ph-speaker-simple-x-fill' />
  }, [volume])

  return (
    <div className={styles.volume}>

      <div onClick={onIconClick}>
        {renderIcon()}
      </div>

      <Slider
        value={volume*100}
        labelText={Math.round(volume*100)}
        onChange={onSliderChange}
        styles={styles}
      />
      
    </div>
  )
})