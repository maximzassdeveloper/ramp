import { FC } from 'react'
import { IFilm } from '@/types/film'
import { CommentList } from '@/components'
import { Container } from '@/components/hoc'
import { Title } from '@/components/generetic'
import { SingleFilmScreen } from './SingleFilmScreen'
import { FilmList } from '../FilmList/FilmList'
import { useFetch } from '@/hooks/useFetch'
import s from './single-film.module.scss'

interface SignleFilmProps {
  film: IFilm
}

export const SingleFilm: FC<SignleFilmProps> = ({ film }) => {

  const { data: films } = useFetch<IFilm[]>('/films')

  return (
    <div className={s.film}>

      <SingleFilmScreen film={film} />

      <Container className={s.container}>
        <div style={{ display: 'flex' }}>
          <div>
            <Title>Comments ({film.comments?.length})</Title>
            <br />
            <CommentList comments={film.comments} />
          </div>
          <div>
            <FilmList className={s.dop} films={films} />
          </div>
        </div>
      </Container>

    </div>
  )
}