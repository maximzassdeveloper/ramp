import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IFilm } from '@/types/film'
import { RouteNames } from '@/router'
import s from './film.module.scss'

interface FilmProps {
  film: IFilm
}

export const Film: FC<FilmProps> = ({ film }) => {
  return (
    <div className={s.film}>

      <Link to={`${RouteNames.FILM}/${film.slug}`}>
        <div className={s.image}>
          <img src={film.preview} alt={film.name} />
        </div>
      </Link>

      <Link to={`${RouteNames.FILM}/${film.slug}`}>
        <h3 className={s.title}>{film.name}</h3>
      </Link>

    </div>
  )
}