import { FC, useEffect } from 'react'
import { useActions, useTypedSelector } from '@/hooks'
import styles from './home.module.scss'

export const Home: FC = () => {

  const { films, isLoading } = useTypedSelector(s => s.film)
  const { fetchFilms } = useActions()

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <div style={{maxWidth: '50%'}}>
        {isLoading && <span>Загрузка</span>}
        {films.map(film => <span key={film.id}>{film.id}</span>)}
      </div>
    </div>
  )
}