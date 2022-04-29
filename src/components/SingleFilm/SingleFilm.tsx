import { FC, useState } from 'react'
import { Seasons } from '@/components'
import { Overview, Navigation, Details, SelectRating } from '.'
import { IFilm } from '@/types/film'
import classNames from 'classnames'
import s from './single-film.module.scss'

interface SignleFilmProps {
  film: IFilm
}

export type SingleFilmTab = 'Overview' | 'Episodes' | 'Details'

export const SingleFilm: FC<SignleFilmProps> = ({ film }) => {

  const [activeTab, setActiveTab] = useState<SingleFilmTab>('Overview')
  const [isShowRating, setIsShowRating] = useState(false)
 
  const classes = classNames(s.film, {
    [s.filmEpisodes]: activeTab === 'Episodes',
    [s.filmDetails]: activeTab === 'Details' 
  })

  return (
    <div className={classes} style={{background: `url(${film.preview})`}}>

      <div className={s.titleWrapper}>
        <h1 className={s.title}>{film.name}</h1>
      </div>

      <div className={s.filmFadingBlock}>
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