import { FC, useEffect, useState } from 'react'
import { Film } from '@/components'
import { IFilm } from '@/types/film'
import { deleteFavourite, getFavourites } from '@/services/favouritesService'
import { Container } from '@/components/hoc/Container'
import { Button, Title } from '@/components/generetic'
import s from './favourites.module.scss'
import ratingServie, { IRatingsItem } from '@/services/ratingsService'

export const Favourites: FC = () => {

  const [films, setFilms] = useState<IFilm[]>([])
  const [ratings, setRatings] = useState<IRatingsItem[]>([])

  const deleteHandler = (id: number) => {
    deleteFavourite(id)
    setFilms(films.filter(i => i.id !== id))
  }

  useEffect(() => {
    setFilms(getFavourites())
    setRatings(ratingServie.getRatings())
  }, [])

  return (
    <Container>
      <Title center level='h2'>Favourites</Title>

      <div className={s.list}>
        {!films.length && <p>Empty :(</p>}
        {!!films.length && films.map(film => <div key={film.id}>
          <Film film={film} />
          <Button 
            size='small' 
            className={s.unfavButton}
            title='Delete from favourites'
            icon={<i className='ph-bookmark-simple-fill' />} 
            onClick={() => deleteHandler(film.id)}
          />
        </div>)}
      </div>  
      
      <br /><br /><br /><br />
      <Title center level='h2'>Ratings</Title>

      <div className={s.list}>
        {!ratings.length && <p>Empty :(</p>}
        {!!ratings.length && ratings.map(({ film, rating}) => <div key={film.id}>
          <Film film={film} />
          <span>{rating}</span>
        </div>)}
      </div>
    </Container>
  )
}