import { FC, useEffect } from 'react'
import { useActions, useTypedSelector } from '@/hooks'
import { FilmList, FilmListByCategory } from '@/components'
import { Title } from '@/components/generetic'
import { useFetch } from '@/hooks/useFetch'
import { ICategory } from '@/types/film'
import styles from './home.module.scss'

export const Home: FC = () => {

  const { films, isLoading, error } = useTypedSelector(s => s.film)
  const { fetchFilms } = useActions()
  const { data: categories } = useFetch<ICategory[]>('/categories')

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <div className={styles.home}>
      <Title level='h1'>Films</Title>
      <FilmList 
        films={films} 
        isLoading={isLoading} 
        error={error} 
      />

      {categories.map(category => 
        <FilmListByCategory key={category.id} category={category} />
      )}
      
    </div>
  )
}