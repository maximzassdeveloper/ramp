import { FC, memo, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { IFilm } from '@/types/film'
import { Button, CloseIcon, RatingStars } from '@/components/generetic'
import ratingService from '@/services/ratingsService'
import s from './select-rating.module.scss'

interface SelectRatingProps {
  isShow: boolean
  film: IFilm
  onClose: () => void
}

export const SelectRating: FC<SelectRatingProps> = memo(({ isShow, onClose, film }) => {

  const [value, setValue] = useState(0)

  console.log('select rare rerender')

  const changeHandler = (val: number) => {
    setValue(val)
  }

  const rateHandler = () => {
    if (!value) return

    if (ratingService.inRatings(film.id)) {
      ratingService.changeRating(film.id, value)
    } else {
      ratingService.addRating(film, value)
    }

    onClose()
  }

  useEffect(() => {
    if (!isShow) return
    const val = ratingService.getRating(film.id)
    if (val && val !== value) setValue(val)
  }, [isShow])

  return (
    <CSSTransition in={isShow} timeout={200} classNames='fadeDown' mountOnEnter unmountOnExit>  
      <div className={s.selectRating}>

        <CloseIcon 
          className={s.close} 
          onClick={onClose}
        />

        <RatingStars 
          count={10}
          value={value}
          showIndex
          size='large'
          onChange={changeHandler}
        />

        <Button className={s.button} onClick={rateHandler}>Rate</Button>
      </div>
    </CSSTransition>
  )
})