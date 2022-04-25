import { FC, useEffect, memo } from 'react'
import { Input } from '@/components/generetic'
import { FilterBlock } from '../FilterBlock'
import s from '../search-filter.module.scss'

interface YearFilterProps {
  onChange: (name: string, val: number[]) => void
  value: number[]
}

export const YearFilter: FC<YearFilterProps> = memo(({ onChange, value }) => {

  useEffect(() => {
    if (value[0] > value[1]) onChange('year', value.reverse())
  }, [value])

  return (
    <FilterBlock title='Year'>
      <div className={s.row}>
        <Input.Number
          min={0}
          value={value[0]}
          max={3000}
          defaultValue={value[0]} 
          onChange={v => onChange('year', new Array(+v, +value[1]))}
        />
        <Input.Number
          min={0}
          max={3000}
          value={value[1]}
          defaultValue={value[1]} 
          onChange={v => onChange('year', new Array(+value[0], +v))}
        />
      </div>
    </FilterBlock>
  )
})