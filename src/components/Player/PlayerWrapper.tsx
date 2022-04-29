import { FC } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Player } from './Player'
import styles from './player.module.scss'
import { useActions, useClickOut } from '@/hooks'

export const PlayerWrapper: FC = () => {

  const { isOpen, episode } = useTypedSelector(s => s.player)
  const { closePlayer } = useActions()
  const { ref } = useClickOut(onClickOut)

  function onClickOut () {
    closePlayer()
  }

  return <>
    {isOpen &&
      <div ref={ref} className={styles.playerWrapper}>
        {episode && !!episode.video.length
          ? <Player sources={episode.video} />
          : <h3>Video not found</h3>
        }
      </div>
    }
  </>
}