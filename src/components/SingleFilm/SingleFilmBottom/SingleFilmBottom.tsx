import { FC } from 'react'
import { Container } from '@/components/hoc'
import { SingleFilmComments } from './SingleFilmComments'
import { IFilm } from '@/types/film'
import s from './single-film-bottom.module.scss'

interface SingleFilmBottomProps {
  film: IFilm
}

export const SingleFilmBottom: FC<SingleFilmBottomProps> = ({ film }) => {
  return (
    <Container className={s.container}>
      <SingleFilmComments 
        comments={film.comments} 
        filmId={film.id} 
      />
    </Container>
  )
}