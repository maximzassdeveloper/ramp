import { Checkbox } from '@/components/generetic'
import { FC, memo, useCallback, useState } from 'react'
import { TypeFilter, RatingFilter, YearFilter, CategoryFilter } from './Filters'
import s from './search-filter.module.scss'

export interface IFilter {
  [key: string]: any
}

interface SearchFilterProps {
  onChange?: (filter: IFilter) => void
}

const defaultFilter: IFilter = {
  type: [],
  categories: [],
  rating: [0, 10],
  year: [2000, (new Date).getFullYear()]
}

export const SearchFilter: FC<SearchFilterProps> = memo(({ onChange }) => {

  const [filter, setFilter] = useState<IFilter>(defaultFilter)
  
  const changeHandler = (name: string, value: (string|number)[]) => {
    const updated = Object.assign({}, filter) 

    if (!value.length) updated[name] = defaultFilter[name]
    updated[name] = value

    setFilter(updated)
    onChange?.(updated)
  }

  const clearFilter = () => {
    setFilter(defaultFilter)
    onChange?.(defaultFilter)
  }

  return (
    <div className={s.filter}>
      <span className={s.clearButton} onClick={clearFilter}>Clear filters</span>
      <TypeFilter onChange={changeHandler} value={filter['type']} />
      <CategoryFilter onChange={changeHandler} value={filter['categories']} />
      <RatingFilter onChange={changeHandler} value={filter['rating']} />
      <YearFilter onChange={changeHandler} value={filter['year']} />
    </div>
  )
})