import { FC } from 'react'
import { IFilm } from '@/types/film'
import { Film, Loader } from '@/components'
import s from './film-list.module.scss'
import classNames from 'classnames'

interface FilmListProps {
  films: IFilm[]
  isLoading?: boolean
  error?: string | null
  className?: string
}

export const FilmList: FC<FilmListProps> = ({ films, isLoading, error, className }) => {
  return (
    <div className={classNames(s.list, className)}>
      {isLoading 
        ? <Loader isLoading={isLoading} />
        : (!!error || !films.length) 
          ? <p>Films not found</p>
          : films.map(film => 
            <Film key={film.id} film={film} />
          )
      }
    </div>
  )
}