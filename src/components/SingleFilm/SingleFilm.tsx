import { FC } from 'react'
import { SingleFilmScreen } from './SingleFilmScreen/SingleFilmScreen'
import { SingleFilmBottom } from './SingleFilmBottom/SingleFilmBottom'
import { IFilm } from '@/types/film'
import s from './single-film.module.scss'

interface SignleFilmProps {
  film: IFilm
}

export const SingleFilm: FC<SignleFilmProps> = ({ film }) => {
  return (
    <div className={s.film}>

      <SingleFilmScreen film={film} />
      <SingleFilmBottom film={film} />

    </div>
  )
}