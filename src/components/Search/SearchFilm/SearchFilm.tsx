import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IFilm } from '@/types/film'
import { RouteNames } from '@/router'
import { useActions } from '@/hooks'
import { fileUrl } from '@/utils/helper'
import s from './search-film.module.scss'
import { Rating } from '@/components/Rating/Rating'

interface SearchFilmProps {
  film: IFilm
}

export const SearchFilm: FC<SearchFilmProps> = ({ film }) => {

  const { closeSearch } = useActions()

  return (
    <Link 
      to={`${RouteNames.FILM}/${film.slug}`} 
      className={s.searchFilm}
      onClick={closeSearch}
    >
      <div className={s.image}>
        <img src={fileUrl(film.preview)} alt={film.name} />
      </div>
      <div className={s.content}>
        <h4 className={s.title}>{film.name}</h4>
        <div className={s.details}>
          <Rating className={s.rating} ratingNumber={film.rating.count} />
          {film.year && <span>{film.year}</span>}
          <span>{film.type === 'series' ? 'Series' : 'Movie'}</span>
        </div>
      </div>
    </Link>
  )
}