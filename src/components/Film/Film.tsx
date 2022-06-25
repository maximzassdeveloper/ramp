import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IFilm } from '@/types/film'
import { RouteNames } from '@/router'
import { fileUrl } from '@/utils/helper'
import s from './film.module.scss'

interface FilmProps {
  film: IFilm
}

const filmTypes = {
  'series': 'Serial',
  'movie': 'Movie'
}

export const Film: FC<FilmProps> = ({ film }) => {
  return (
    <div className={s.film}>

      <Link to={`${RouteNames.FILM}/${film.slug}`}>
        <div className={s.image}>
          <img src={fileUrl(film.preview)} alt={film.name} loading='lazy' />
        </div>
      </Link>

      <Link to={`${RouteNames.FILM}/${film.slug}`}>
        <h3 className={s.title}>{film.name}</h3>
      </Link>

      <span className={s.type}>{filmTypes[film.type]}</span>

    </div>
  )
}