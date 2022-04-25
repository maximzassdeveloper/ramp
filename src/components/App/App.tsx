import { FC } from 'react'
import { Sidebar, PlayerWrapper } from '..'
import { AppRouter } from '@/router/AppRouter'
import styles from './app.module.scss'

export const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main}>
        <PlayerWrapper />
        <AppRouter />
      </main>
    </div>
  )
}