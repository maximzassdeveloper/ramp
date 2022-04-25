import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SingleFilm } from '@/components'
import { IFilm } from '@/types/film'
import { getFilm } from '@/services/filmService'

export const SingleFilmPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [film, setFilm] = useState<IFilm | null>(null)

  const getFilmFunc = async () => {
    const resp = await getFilm(slug)
    setFilm(resp.data[0])
  }

  useEffect(() => {
    getFilmFunc()
  }, [slug])

  if (!film) return <span>Not found</span>

  return (
    film && <SingleFilm film={film} />
  )
}