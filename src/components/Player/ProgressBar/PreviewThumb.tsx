import { FC, RefObject, useRef, useState, useEffect, memo } from 'react'
import { convertTime } from '@/utils/convertTime'
import { IThumb, loadThumb, loadThumbs, loadVideoThumbs } from './loadVideoThumbs'
import styles from './bar.module.scss'
import { Loader } from '@/components/Loader'

interface PreviewThumbProps {
  video: RefObject<HTMLVideoElement>
  slider: RefObject<HTMLDivElement>
  duration: number
}

export const PreviewThumb: FC<PreviewThumbProps> = memo(({ video, slider, duration }) => {

  // const [thumbs, setThumbs] = useState<IThumb[]>([])
  const thumbs = useRef<IThumb[]>([])
  const [previewTime, setPreviewTime] = useState(0)
  const previewLeft = useRef(0)
  const previewImage = useRef<HTMLDivElement>(null)

  const onMouseMove = async (e: MouseEvent) => {
    if (!slider.current || !previewImage.current) return

    const { width, x: startX } = slider.current.getBoundingClientRect()
    const { pageX: moveX } = e
    const offsetX = moveX - startX
    
    const halfWidthPreview = Math.round(previewImage.current.offsetWidth / 2)

    if (offsetX < halfWidthPreview) {
      previewLeft.current = halfWidthPreview
    } else if (offsetX > width - halfWidthPreview) {
      previewLeft.current = width - halfWidthPreview
    } else {
      previewLeft.current = offsetX
    }
    
    const newTime = Math.round(offsetX / width * duration)
    if (previewTime !== newTime) {
      setPreviewTime(newTime)

      // console.log(thumbs)
      for (const thumb of thumbs.current) {
        const curSec = thumb.sec.find(i => i.index === newTime)
        
        if (curSec) {
          // console.log(thumb)
          // console.log(curSec.bgPosX, curSec.bgPosY)
          previewImage.current.style.backgroundImage = `url(${thumb.url})`
          previewImage.current.style.backgroundPositionX = `${curSec.bgPosX}px`
          previewImage.current.style.backgroundPositionY = `${curSec.bgPosY}px`
          break
        }
      }
    }
  }

  useEffect(() => {
    if (!video.current || !duration) return

    const cloneVideo = video.current.cloneNode() as HTMLVideoElement
    cloneVideo.width = 200
    cloneVideo.height = 120
    cloneVideo.style.display = 'none'
    // console.log(loadThumbs(cloneVideo, duration))
    // setThumbs(loadThumbs(cloneVideo, duration))
    // thumbs.current = loadVideoThumbs(duration, cloneVideo)
    thumbs.current = loadThumbs(cloneVideo, duration)

    slider.current?.addEventListener('mousemove', onMouseMove)
    return () => {
      slider.current?.removeEventListener('mousemove', onMouseMove)
    }
  }, [duration])

  return (
    <div 
      // ref={previewDiv}
      className={styles.preload}
      style={{ left: `${previewLeft.current}px` }}
    >
      <div 
        ref={previewImage}
        className={styles.preloadImage}
        // style={{ backgroundImage: `url(${thumbs.current[previewTime] || ''})` }}
      >
        {/* <Loader loading={!thumbs[previewTime]} /> */}
      </div>
      <span className={styles.preloadTime}>{convertTime(previewTime)}</span>
    </div>
  )
})