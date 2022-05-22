import { FC, useState } from 'react'
import classNames from 'classnames'
import { IFilm } from '@/types/film'
import { Seasons } from '@/components'
import { fileUrl } from '@/utils/helper'
import { Overview, Details, Navigation } from '.'
import { SelectRating } from '../SelectRating/SelectRating'
import s from './single-film-screen.module.scss'

interface SingleFilmScreenProps {
  film: IFilm
}

export type SingleFilmTab = 'Overview' | 'Episodes' | 'Details'

export const SingleFilmScreen: FC<SingleFilmScreenProps> = ({ film }) => {

  const [activeTab, setActiveTab] = useState<SingleFilmTab>('Overview')
  const [isShowRating, setIsShowRating] = useState(false)
 
  const classes = classNames(s.filmScreen, {
    [s.filmScreenEpisodes]: activeTab === 'Episodes',
    [s.filmScreenDetails]: activeTab === 'Details' 
  })

  return (
    <div className={classes} style={{ background: `url(${fileUrl(film.preview)})` }}>

      <div className={s.titleWrapper}>
        <h1 className={s.title}>{film.name}</h1>
      </div>

      <div className={s.screenFadingBlock}>
        <Overview 
          film={film} 
          isShow={activeTab === 'Overview'}
          onOpenRating={() => setIsShowRating(true)}
        />  

        <Details 
          film={film} 
          isShow={activeTab === 'Details'}
        />
      </div>

      <Navigation 
        activeTab={activeTab} 
        filmType={film.type}
        onChange={setActiveTab} 
      />

      <SelectRating 
        isShow={isShowRating} 
        film={film}
        onClose={() => setIsShowRating(false)} 
      />
      
      {film.seasons && <div className={s.seasonsWrapper}>
        <Seasons 
          film={film} 
          seasons={film.seasons} 
          classes={s}
        />
      </div>}

    </div>
  )
}