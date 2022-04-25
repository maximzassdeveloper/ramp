import { FC, useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '@/hooks'
import { Loader } from '../Loader'
import { SearchFilm } from './SearchFilm/SearchFilm'
import s from './search.module.scss'

export const SearchList: FC = () => {

  const {
    filtered: films,
    isFilteredLoading: isLoading,
    filteredError: error
  } = useTypedSelector(s => s.film)

  const [height, setHeight] = useState('')
  const list = useRef<HTMLDivElement>(null)
  
  const calcListMaxHeight = () => {
    if (!list.current) return ''
    const { top } = list.current.getBoundingClientRect()
    return `calc(100vh - ${Math.round(top + 20)}px`
  }

  useEffect(() => {
    setHeight(calcListMaxHeight())
  }, [list])

  return (
    <div 
      ref={list} 
      className={s.searchList} 
      style={{ maxHeight: height }}
    >
      {isLoading 
        ? <Loader loading={isLoading} />
        : <>
          {error && <span className={s.notfound}>{error}</span>}
          {!error && !films.length && <span className={s.notfound}>No results</span>}
          {!error && !!films.length && <>
            <span className={s.itemsCount}>{films.length} items</span>
            {films.map(film => 
              <SearchFilm key={film.id} film={film} />
            )}
          </>}
        </>
      }
    </div>
  )
}