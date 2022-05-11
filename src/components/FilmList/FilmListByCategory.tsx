import { FC } from 'react'
import { ICategory, IFilm } from '@/types/film'
import { useFetch } from '@/hooks/useFetch'
import { Title } from '@/components/generetic'
import { FilmList } from './FilmList'
import s from './film-list.module.scss'

interface FilmListByCategoryProps {
  category: ICategory
}

export const FilmListByCategory: FC<FilmListByCategoryProps> = ({ category }) => {

  const { data: films, isLoading, error } = useFetch<IFilm[]>(`/films?categoryId=${category.id}`)

  if (!films.length) return null

  return (
    <div className={s.filmsByCategory}>
      <Title level='h2'>{category.name}</Title>
      <FilmList 
        films={films}
        isLoading={isLoading}
        error={error}
      /> 
    </div>
  )
}