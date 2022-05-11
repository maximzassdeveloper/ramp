import { FC, useEffect, memo } from 'react'
import { Input } from '@/components/generetic'
import { FilterBlock } from '../FilterBlock'
import s from '../search-filter.module.scss'

interface YearFilterProps {
  onChange: (name: string, val: number[]) => void
  value: number[]
}

export const YearFilter: FC<YearFilterProps> = memo(({ onChange, value: years }) => {

  useEffect(() => {
    if (years[0] > years[1]) onChange('year', years.reverse())
  }, [years])

  return (
    <FilterBlock title='Year'>
      <div className={s.row}>
        <Input.Number
          min={0}
          value={years[0]}
          max={3000}
          defaultValue={years[0]} 
          onChange={v => onChange('year', [+v, +years[1]])}
        />
        <Input.Number
          min={0}
          max={3000}
          value={years[1]}
          defaultValue={years[1]} 
          onChange={v => onChange('year', [+years[0], +v])}
        />
      </div>
    </FilterBlock>
  )
})