import { FC, useMemo } from 'react'
import { useActions, useClickOut, useTypedSelector } from '@/hooks'
import { fileUrl } from '@/utils/helper'
import { Player } from './Player'
import styles from './player.module.scss'

export const PlayerWrapper: FC = () => {

  const { isOpen, episode } = useTypedSelector(s => s.player)
  const { closePlayer } = useActions()
  const { ref } = useClickOut(onClickOut)

  const sources = useMemo(() => {
    return episode?.video.map(source => ({ ...source, url: fileUrl(source.url) })) || []
  }, [episode])

  function onClickOut () {
    closePlayer()
  }

  return <>
    {isOpen &&
      <div ref={ref} className={styles.playerWrapper}>
        {episode && !!episode.video.length
          ? <Player sources={sources} />
          : <h3>Video not found</h3>
        }
      </div>
    }
  </>
}