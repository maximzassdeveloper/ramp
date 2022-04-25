import { FC, useEffect, useRef, useState } from 'react'
import { Controls } from './Controls/Controls'
import { PlayerHeader } from './PlayerHeader'
import { PlayButton } from './common'
import { Loader } from '@/components'
import { IPlayerContext, PlayerProvider } from './playerContext'
import { IVideoSource } from '@/types/film'
import { checkCanPlay, keyDownHandler } from './playerFuncs'
import styles from './player.module.scss'

interface VideoProps {
  sources: IVideoSource[]
}

export const Player: FC<VideoProps> = ({ sources }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [src, setSrc] = useState('')
  const [isPlay, setIsPlay] = useState(false)
  const [duration, setDuration] = useState(0)
  const video = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  
  const changePlay = (flag?: boolean) => {
    if (flag !== undefined) {
      flag ? video.current?.play() : video.current?.pause()
      setIsPlay(flag)
    } else {
      isPlay ? video.current?.pause() : video.current?.play()
      setIsPlay(!isPlay)
    }
  }

  const defaultContext: IPlayerContext = { 
    isPlay, 
    changePlay, 
    sources,
    video, 
    duration, 
    playerRef 
  }
  
  const initVideo = () => {
    if (!video.current) return

    video.current.volume = 0
    // video.current.duration = 4140

    changePlay(true)
  }

  const onDurationChange = (e: any) => {
    setDuration(Math.floor(e.target.duration ?? 0))
  }

  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    if (!video.current) return
    keyDownHandler(e.keyCode, defaultContext)
  }

  // Select optimal source
  useEffect(() => {
    for (const source of sources) {
      const isCanPlay = checkCanPlay(source.type)

      if (isCanPlay) {
        setSrc(source.url)
        break
      }
    }
  }, [sources])

  // key events
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [defaultContext])
  
  return (
    <PlayerProvider value={defaultContext}>

      <div className={styles.player} ref={playerRef}>
        <video 
          ref={video}
          crossOrigin=''
          onSeeking={() => setIsLoading(true)}
          onSeeked={() => setIsLoading(false)}
          onPlay={() => setIsPlay(true)}
          onPause={() => setIsPlay(false)}
          onEnded={() => setIsPlay(false)}
          onLoadedMetadata={initVideo}
          onDurationChange={onDurationChange}
          src={src}
        >
          {sources.map((s, i) => 
            <source key={i+s.url} src={s.url} type={s.type} data-size={s.size} />
          )}
        </video>

        <PlayButton center />
        <Loader loading={isLoading} className={styles.playerLoader} />
        
        <PlayerHeader />
        <Controls />
      </div>

    </PlayerProvider>
  )
}