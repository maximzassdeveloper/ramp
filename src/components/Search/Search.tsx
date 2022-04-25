import { FC, useEffect, useState, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useActions, useClickOut, useDebounce, useTypedSelector } from '@/hooks'
import { ObjectIsEmpty } from '@/utils/helper'
import { SearchInput, SearchList, SearchFilter, createUrl, IFilter } from '.'
import s from './search.module.scss'

export const Search: FC = () => {

  const { fetchFilteredFilms, closeSearch } = useActions()
  const { isOpen } = useTypedSelector(s => s.search)
  const [value, setValue] = useState('')
  const [filter, setFilter] = useState<IFilter>({})

  const { ref: containerRef } = useClickOut(onClickOut)
  
  function onClickOut (e: any) {
    const link = document.querySelector('[data-search-link]')
    if (!link?.contains(e.target)) closeSearch()
  }

  const inputHandler = useCallback(useDebounce((val: string) => {
    setValue(val)
  }, 300), [])

  const filterHandler = useCallback(useDebounce((filter: IFilter) => {
    setFilter(filter)
  }, 300), [])

  useEffect(() => {
    if (value || !ObjectIsEmpty(filter)) {
      fetchFilteredFilms(createUrl(value, filter))
    }
  }, [value, filter])

  // useEffect(() => {
  //   fetchFilteredFilms()
  // }, [])

  return (
    <CSSTransition in={isOpen} timeout={200} classNames={...s} mountOnEnter unmountOnExit>
      <div className={s.search}>

        <div ref={containerRef} className={s.container}>
          <SearchInput onChange={inputHandler} />
          <SearchList />
          <SearchFilter onChange={filterHandler} />
        </div>

      </div>
    </CSSTransition>
  )
}