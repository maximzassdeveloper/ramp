import { FC } from 'react'
import { useQuery } from 'react-query'
import { Title } from '@/components/generetic'
import { FilmList } from './FilmList'
import filmService from '@/services/filmService'
import s from './film-list.module.scss'

interface FilmsWithTitleProps {
  title: string
  queryParams?: {
    [key: string]: string | number
  }
}

export const FilmsWithTitle: FC<FilmsWithTitleProps> = ({ title, queryParams }) => {

  const { data = [], isLoading } = useQuery(`get films ${title}`, () => filmService.getFilms(queryParams), {
    select: resp => resp.data,
    refetchOnMount: false
  })

  return (
    <div className={s.filmsWithTitle}>
      <Title level='h2'>{title}</Title>
      <FilmList 
        films={data} 
        isLoading={isLoading} 
      />
    </div>
  )
}