import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Rating } from '@/components'
import { IFilm } from '@/types/film'
import { Buttons } from './Buttons'
import s from './single-film-screen.module.scss'

interface OverviewProps {
  film: IFilm
  isShow: boolean
  onOpenRating: () => void
}

export const Overview: FC<OverviewProps> = ({ film, isShow, onOpenRating }) => {
  
  return <CSSTransition in={isShow} timeout={200} classNames="fadeDown" mountOnEnter unmountOnExit>
    <div className={s.info}>

      <div className={s.options}>
        {film.year && <span>{film.year}</span>}
        {film.category && <span>{film.category.name}</span>}
        {film.ageLimit && <span className={s.ageLimit}>{film.ageLimit}</span>}
        <Rating rating={film.rating} />
      </div>

      {film.shortDesc && <p className={s.shortDesc}>{film.shortDesc}</p>}

      <Buttons film={film} onOpenRating={onOpenRating} />

    </div>  
  </CSSTransition>
}