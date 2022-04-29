import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, SingleFilm } from '@/components'
import { IFilm } from '@/types/film'
import { getFilm } from '@/services/filmService'
import styles from './single-film.module.scss'

export const SingleFilmPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [film, setFilm] = useState<IFilm | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getFilmFunc = async () => {
    setIsLoading(true)
    try {
      const resp = await getFilm(slug)
      setFilm(resp.data[0])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFilmFunc()
  }, [slug])

  return <div className={styles.filmWrapper}>
    {isLoading 
      ? <Loader isLoading={isLoading} /> 
      : film && <SingleFilm film={film} />
    }
  </div>
}