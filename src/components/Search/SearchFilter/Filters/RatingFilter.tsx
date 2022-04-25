import { FC, memo } from 'react'
import { FilterBlock } from '../FilterBlock'
import { Slider } from '@/components/generetic'

interface RatingFilterProps {
  onChange: (name: string, value: number[]) => void
  value: number[]
}

export const RatingFilter: FC<RatingFilterProps> = memo(({ onChange, value: rating }) => {

  const sliderHandler = (value: number[]) => {
    onChange('rating', value)
  }

  return (
    <FilterBlock title='Rating'>
      <Slider 
        onChange={sliderHandler}
        value={rating}
        min={0}
        max={10}
        step={1}
        range
      />
    </FilterBlock>
  )
})