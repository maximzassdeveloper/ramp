import { FC } from 'react'
import { FilmsWithTitle } from '@/components'
import styles from './home.module.scss'

export const Home: FC = () => {
  return (
    <div className={styles.home}>
      
      <FilmsWithTitle 
        title='Popular'
        queryParams={{
          _limit: 5,
          _sort: 'rating.views',
          _order: 'desc'
        }}
      />

      <FilmsWithTitle 
        title='Recommended'
        queryParams={{
          _limit: 5,
          _sort: 'rating.count',
          _order: 'desc'
        }}
      />

    </div>
  )
}