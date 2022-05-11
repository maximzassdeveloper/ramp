import { FC, memo, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useInView } from 'react-intersection-observer'

import { useActions, useTypedSelector } from '@/hooks'
import { CloseIcon } from '@/components/generetic'
import { SearchList, SearchInput, SearchFilter } from '.'
import { useSearch } from './useSearch'
import s from './search.module.scss'

export const Search: FC = memo(() => {

  const { isOpen } = useTypedSelector(s => s.search)
  const { closeSearch } = useActions()
  const { ref, inView } = useInView()

  const { 
    onInputValueChange,
    onFilterChange,
    triggerLoadMore,
    hasNextPage,

    data, 
    isLoading, 
    error, 
  } = useSearch()

  useEffect(() => {
    triggerLoadMore()
  }, [inView])

  return (
    <CSSTransition in={isOpen} timeout={200} classNames={{...s}} mountOnEnter unmountOnExit>
      <div className={s.search}>

        <div className={s.container}>
          <SearchInput 
            onChange={onInputValueChange} 
          />
          
          <SearchList 
            films={data} 
            isLoading={isLoading} 
            error={error as Error} 
            buttonRef={ref}
            isShowButton={hasNextPage || false}
          />

          <SearchFilter 
            onChange={onFilterChange} 
          />

          <CloseIcon className={s.close} onClick={closeSearch} />
        </div>

      </div>
    </CSSTransition>
  )
})