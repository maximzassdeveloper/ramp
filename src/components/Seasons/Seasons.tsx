import { FC, useState } from 'react'
import { IFilm, ISeason } from '@/types/film'
import { useActions } from '@/hooks/useActions'
import classNames from 'classnames'

import '@splidejs/splide/dist/css/splide.min.css'
import s from './seasons.module.scss'

import { SeasonsMenu } from './SeasonsMenu'
import { SeasonsList } from './SeasonsList'

export type Direction = 'horizontal' | 'vertical'

interface SeasonProps {
  seasons: ISeason[]
  film: IFilm
  direction?: Direction
  classes?: any
}

export const Seasons: FC<SeasonProps> = ({ seasons, film, direction = 'horizontal', classes }) => {

  const { openPlayer } = useActions()
  const [activeSeason, setActiveSeason] = useState(seasons[0])

  const selectHandler = (id: number) => {
    const season = seasons.find(el => el.id === id)
    if (season) setActiveSeason(season)
  }

  const onPlayClick = () => {
    openPlayer({
      episode: seasons[0].episodes[0],
      film
    })
  }

  const cls = classNames(
    s.seasons,
    classes?.seasons,
    { [s.vertical]: direction === 'vertical' }
  )

  return (
    <div className={cls}>

      {direction === 'horizontal' && <div 
        onClick={onPlayClick} 
        className={classNames(s.play, classes?.play)}
      >
        <i className="ph-play-fill"></i>
      </div>}

      <SeasonsMenu 
        seasons={seasons} 
        activeSeason={activeSeason} 
        onSelect={selectHandler}
      />

      <SeasonsList 
        season={activeSeason} 
        film={film} 
        direction={direction} 
      />
    </div>
  )
}