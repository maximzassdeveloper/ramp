import { FC, useState } from 'react'
import { Seasons } from '@/components/Seasons/Seasons'
import { useTypedSelector, useClickOut } from '@/hooks'
import { PlayerAlert } from '../common/PlayerAlert'

export const PlayerSeasons: FC = () => {

  const [isOpen, setIsOpen] = useState(false)
  const { film, episode } = useTypedSelector(s => s.player)
  const { ref } = useClickOut(onClickOut)

  function onClickOut () {
    setIsOpen(false)
  }

  if (!film || film?.type === 'movie') return null

  return (
    <div ref={ref}>
      <PlayerAlert isOpen={isOpen}>
        <div>
          <Seasons 
            film={film}
            seasons={film.seasons}
            activeEpisode={episode}
            direction='vertical'
          />
        </div>
      </PlayerAlert>

      <div onClick={() => setIsOpen(!isOpen)}>
        <i className='ph-browsers-fill' />
      </div>
    </div>
  )
}