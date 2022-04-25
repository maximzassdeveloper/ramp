import { FC, useState } from 'react'
import { IFilm, ISeason } from '@/types/film'
import { useActions } from '@/hooks/useActions'

import '@splidejs/splide/dist/css/splide.min.css'
import styles from './seasons.module.scss'

import { SeasonsMenu } from './SeasonsMenu'
import { SeasonsList } from './SeasonsList'

export type Direction = 'horizontal' | 'vertical'

interface SeasonProps {
  seasons: ISeason[]
  film: IFilm
  direction?: Direction
}

export const Seasons: FC<SeasonProps> = ({ seasons, film, direction = 'horizontal' }) => {

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

  const cls = [styles.seasons]
  if (direction === 'vertical') cls.push(styles.seasonsVertical)

  return (
    <div className={cls.join(' ')}>

      {direction === 'horizontal' && <div onClick={onPlayClick} className={styles.play}>
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