import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IFilm } from '@/types/film'
import { RouteNames } from '@/router'
import { useActions } from '@/hooks'
import s from './search-film.module.scss'

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
        <img src={film.preview} alt={film.name} />
      </div>
      <div className={s.content}>
        <h4 className={s.title}>{film.name}</h4>
        <div className={s.details}>
          <span className={s.rating}>{film.rating.count}</span>
          {film.year && <span>{film.year}</span>}
          <span>{film.type === 'series' ? 'Series' : 'Movie'}</span>
        </div>
      </div>
    </Link>
  )
}