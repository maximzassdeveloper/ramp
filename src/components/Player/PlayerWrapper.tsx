import { FC, useEffect } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Player } from './Player'
import styles from './player.module.scss'
import { useActions } from '@/hooks'

export const PlayerWrapper: FC = () => {

  const { isOpen, episode } = useTypedSelector(s => s.player)
  const { closePlayer } = useActions()

  // useEffect(() => {
  //   if (!episode || !episode.video.length) {
  //     closePlayer()
  //   }
  // }, [episode])

  return <>
    {isOpen &&
      <div className={styles.playerWrapper}>
        {episode && !!episode.video.length
          ? <Player sources={episode.video} />
          : <h3>Video not found</h3>
        }
      </div>
    }
  </>
}