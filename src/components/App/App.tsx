import { FC, useEffect } from 'react'
import { Sidebar, PlayerWrapper } from '..'
import { AppRouter } from '@/router/AppRouter'
import styles from './app.module.scss'
import { useActions } from '@/hooks'

export const App: FC = () => {

  const { setIsAuth, setUser } = useActions()

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    if (isAuth) {
      setIsAuth(true)
      setUser(JSON.parse(localStorage.getItem('user') ?? ''))
    }
  }, [])

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