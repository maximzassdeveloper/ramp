import { FC } from 'react'
import { Rating } from '..'
import { IFilm } from '../../types/film'

interface SingleFilmInfoProps {
  film: IFilm
}

export const SingleFilmInfo: FC<SingleFilmInfoProps> = ({ film }) => {
  return (
    <div className="single-film-info">
      <div className="single-film__options">
        {film.year && <span>{film.year}</span>}
        {film.categories && <span>{film.categories.join(', ')}</span>}
        {film.ageLimit && <span className="age-rating">{film.ageLimit}</span>}
        <Rating rating={film.rating} />
      </div>
      {film.shortDesc && <p className="single-film__short-desc">{film.shortDesc}</p>}
    </div>  
  )
}