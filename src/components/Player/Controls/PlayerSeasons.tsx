import { FC } from 'react'
import { Seasons } from '@/components/Seasons/Seasons'
import { useTypedSelector, useClickOut } from '@/hooks'
import { PlayerAlert } from '../common/PlayerAlert'

export const PlayerSeasons: FC = () => {

  const { film } = useTypedSelector(s => s.player)
  const { isOpen, setIsOpen, ref, sourceRef } = useClickOut()

  return (
    <div>
      <PlayerAlert elRef={ref} isOpen={isOpen}>
        <div>
          {film && <Seasons 
            film={film}
            seasons={film.seasons}
            direction='vertical'
          />}
        </div>
      </PlayerAlert>

      <div ref={sourceRef} onClick={() => setIsOpen(!isOpen)}>
        <i className="ph-browsers-fill"></i>
      </div>
    </div>
  )
}