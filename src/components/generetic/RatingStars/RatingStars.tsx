import { FC, memo, useMemo, useState } from 'react'
import classNames from 'classnames'
import s from './rating-stars.module.scss'

interface RatingStarsProps {
  count?: number
  value: number
  labelText?: string
  size?: 'default' | 'large'
  className?: string
  showIndex?: boolean
  onChange?: (val: number) => void
  onHover?: (val: number) => void
}

export const RatingStars: FC<RatingStarsProps> = memo(({ 
  count = 5, value, className, labelText, showIndex = false, size = 'default', onChange, onHover 
}) => {

  const [hovered, setHovered] = useState(0)
  const [isHover, setIsHover] = useState(false)

  const stars = useMemo(() => {
    return new Array(count).fill(0).map((_,i) => i+1)
  }, [count])

  const starHoverHandler = (val: number) => {
    setHovered(val)
    onHover?.(val)
  }

  const starClickHandler = (val: number) => {
    onChange?.(val)
  }
  
  return (
    <div 
      className={classNames(s.stars, className, s[size], { [s.showIndex]: showIndex })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={s.list}>
        {stars.map(val => 
          <span 
            key={val}
            className={classNames(s.star, { [s.starActive]: val <= (isHover ? hovered : value) })} 
            onMouseEnter={() => starHoverHandler(val)}
            onClick={() => starClickHandler(val)}
          >
            <i className='ph-star-fill' />
            {showIndex && <span className={s.starIndex}>{val}</span>}
          </span>
        )}
      </div>

      {!!labelText && <p className={s.label}>{labelText}</p>}
    </div>
  )
})