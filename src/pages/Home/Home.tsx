import { FC, useEffect, useState } from 'react'
import { useActions, useTypedSelector } from '@/hooks'
import styles from './home.module.scss'
import { FilmList } from '@/components'
import { RatingStars, Title } from '@/components/generetic'

const label: any = {
  1: 'Terrible',
  2: 'Bad',
  3: 'Bad',
  4: 'Bad',
  5: 'Normal',
  6: 'Normal',
  7: 'Good',
  8: 'Good',
  9: 'Wonderful',
  10: 'Excellent',
}

export const Home: FC = () => {

  const { films, isLoading, error } = useTypedSelector(s => s.film)
  const { fetchFilms } = useActions()

  const [value, setValue] = useState(0)
  const [labelText, setLabelText] = useState('')

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

      <RatingStars 
        value={value}
        count={10}
        size='large'
        showIndex
        onChange={v => {
          setValue(v)
        }}
      />
    </div>
  )
}