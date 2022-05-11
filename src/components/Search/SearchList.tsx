import { FC, useEffect, useRef, useState } from 'react'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/generetic'
import { SearchFilm } from './SearchFilm/SearchFilm'
import { IFetchedData } from './searchTypes'
import s from './search.module.scss'

interface SearchListProps {
  films: IFetchedData[]
  isLoading: boolean
  error: Error
  isShowButton: boolean
  buttonRef: any
}

export const SearchList: FC<SearchListProps> = ({ films, isLoading, error, isShowButton, buttonRef }) => {

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
        ? <Loader isLoading={isLoading} />
        : (error || !films.length || !films[0]?.films.length) 
          ? <span className={s.notfound}>{error ? error.message : 'No results'}</span>
          : <>
            {films.map(page => 
              page.films.map(film => 
                <SearchFilm key={film.id} film={film} />
              )
            )}
            {isShowButton && <Button ref={buttonRef} size='small'>Load more</Button>}
          </>
      }
    </div>
  )
}