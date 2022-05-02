import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
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

  const inactionTimeout = useRef<any>(null)
  const [isInaction, setIsInaction] = useState(false)
  
  
  const defaultContext: IPlayerContext = { 
    isPlay, 
    changePlay, 
    setSource,
    sources,
    video, 
    duration, 
    playerRef 
  }

  function changePlay(flag?: boolean) {
    if (flag !== undefined) {
      flag ? video.current?.play() : video.current?.pause()
      setIsPlay(flag)
    } else {
      isPlay ? video.current?.pause() : video.current?.play()
      setIsPlay(!isPlay)
    }
  }

  function setSource(source: IVideoSource) {
    const isCanPlay = checkCanPlay(source.type)
    if (isCanPlay) {
      setSrc(source.url)
      return true
    }
    return false
  }
  
  const initVideo = () => {
    if (!video.current) return

    video.current.volume = 0

    changePlay(true)
  }

  const onDurationChange = (e: any) => {
    setDuration(Math.floor(e.target.duration ?? 0))
  }

  
  const inactionCallback = useCallback(() => {
    setIsInaction(false)
    
    clearTimeout(inactionTimeout.current)
    inactionTimeout.current = setTimeout(() => {
      setIsInaction(true)
    }, 4000)
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    inactionCallback()
    
    if (!video.current) return
    keyDownHandler(e.keyCode, defaultContext)
  }

  // Select optimal source
  useEffect(() => {
    for (const source of sources) {
      if (setSource(source)) break
    }
  }, [sources])

  // key event
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousemove', inactionCallback)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousemove', inactionCallback)
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
        <Loader isLoading={isLoading} className={styles.playerLoader} />
        
        <CSSTransition in={isInaction} timeout={200} classNames={{...styles}}>
          <div style={...styles}>
            <PlayerHeader />
            <Controls />
          </div>
        </CSSTransition>
      </div>

    </PlayerProvider>
  )
}