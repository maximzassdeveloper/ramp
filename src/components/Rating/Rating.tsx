import { FC, useMemo } from 'react'
import { IRating } from '@/types/film'
import { convertViews } from '@/utils/convertViews'
import { numDiapozone, numTrim } from '@/utils/helper'
import classNames from 'classnames'
import s from './rating.module.scss'

interface RatingProps {
  rating?: IRating
  ratingNumber?: number
}

export const Rating: FC<RatingProps> = ({ rating, ratingNumber }) => {

  const color = useMemo(() => {
    let count = rating?.count ?? ratingNumber

    if (count !== undefined) {
      count = numTrim(count, 0, 10)
      return numDiapozone(count, 7, 10) ? 'green' : numDiapozone(count, 4, 7) ? 'grey' : 'red'
    }

    return ''
  }, [rating?.count, ratingNumber])

  return (
    <div className={s.rating}>

      <span className={classNames(s.count, s[color], { [s.ratingNumber]: ratingNumber !== undefined })}>
        {rating?.count ?? ratingNumber}
      </span>

      {rating?.views && <span className={s.views}>{convertViews(rating.views)}</span>}

    </div>
  )
}