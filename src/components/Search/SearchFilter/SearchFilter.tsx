import { FC, memo, useCallback, useState } from 'react'
import { TypeFilter, RatingFilter, YearFilter, CategoryFilter } from './Filters'
import { IFilter } from '../searchTypes'
import s from './search-filter.module.scss'

interface SearchFilterProps {
  onChange: (filter: IFilter) => void
}

const defaultFilter: IFilter = {
  type: [],
  categories: [],
  rating: [0, 10],
  year: [2000, (new Date).getFullYear()]
}

export const SearchFilter: FC<SearchFilterProps> = memo(({ onChange }) => {

  const [filter, setFilter] = useState(defaultFilter)
  
  const changeHandler = useCallback((name: keyof IFilter, value: (string | number)[]) => {
    setFilter(f => {
      const updated = { ...f, [name]: value }
      onChange(updated)
      return updated
    })
  }, [])

  const clearFilter = () => {
    setFilter(defaultFilter)
    onChange(defaultFilter)
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