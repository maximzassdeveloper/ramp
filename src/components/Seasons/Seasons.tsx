import { FC, useState, useMemo } from 'react'
import { IEpisode, IFilm, ISeason } from '@/types/film'
import { useActions } from '@/hooks/useActions'
import classNames from 'classnames'

import '@splidejs/splide/dist/css/splide.min.css'
import styles from './seasons.module.scss'

import { SeasonsMenu } from './SeasonsMenu'
import { SeasonsList } from './SeasonsList'
import { combineStyles } from '@/utils/combineStyles'

export type Direction = 'horizontal' | 'vertical'

interface SeasonProps {
  seasons: ISeason[]
  film: IFilm
  direction?: Direction
  activeEpisode?: IEpisode | null
  classes?: any
}

export const Seasons: FC<SeasonProps> = ({ 
  seasons, film, activeEpisode, direction = 'horizontal', classes 
}) => {

  const s = useMemo(() => combineStyles(styles, classes), [classes])
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

  return (
    <div className={classNames(s.seasons, { [s.vertical]: direction === 'vertical' })}>

      {direction === 'horizontal' && (
        <div 
          onClick={onPlayClick} 
          className={s.play}
        >
          <i className='ph-play-fill' />
        </div>
      )}

      <SeasonsMenu 
        seasons={seasons} 
        activeSeason={activeSeason} 
        onSelect={selectHandler}
      />

      <SeasonsList 
        season={activeSeason} 
        film={film} 
        direction={direction} 
        activeEpisode={activeEpisode}
        styles={s}
      />
    </div>
  )
}