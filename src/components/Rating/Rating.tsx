import { FC } from 'react'
import { IRating } from '@/types/film'
import {classnames} from '@/utils/classnames'
import { convertViews } from '@/utils/convertViews'
import './rating.scss'

interface RatingProps {
  rating: IRating
}

const diap = (n: number, a: number, b: number) => a <= n && n <= b

export const Rating: FC<RatingProps> = ({ rating: { count, views } }) => {

  if (count > 10) count = 10
  if (count < 0) count = 0
  const ratingColor = diap(count, 7, 10) ? 'green' : diap(count, 4, 7) ? 'grey' : 'red'

  return (
    <div className="rating">
      <span className={classnames('rating__count', ratingColor)}>{count}</span>
      <span className="rating__views">{convertViews(views)}</span>
    </div>
  )
}