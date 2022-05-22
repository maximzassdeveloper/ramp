import { useState, useCallback, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useDebounce } from '@/hooks'
import { createParams, fetchSearchFilms } from './searchUtils'
import { IFetchedData, IFilter, IParams } from './searchTypes'

export const useSearch = () => {
  const inputValueRef = useRef('')
  const filterRef = useRef({} as IFilter)
  const [params, setParams] = useState<IParams>(createParams(inputValueRef.current, filterRef.current))


  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<IFetchedData>(
    ['search films', params],
    ({ pageParam = 1 }) => fetchSearchFilms(params, pageParam),
    {
      getNextPageParam: lastPage => lastPage.next ?? undefined,
      getPreviousPageParam: firstPage => firstPage.prev ?? undefined
    }
  )

  const triggerLoadMore = useCallback(() => {
    fetchNextPage()
  }, [fetchNextPage])

  const onInputValueChange = useCallback(useDebounce((val: string) => {
    inputValueRef.current = val
    setParams(createParams(val, filterRef.current))
  }, 500), [])

  const onFilterChange = useCallback(useDebounce((filter: IFilter) => {
    filterRef.current = filter
    setParams(createParams(inputValueRef.current, filter))
  }, 500), [])


  return {
    onInputValueChange,
    onFilterChange,

    triggerLoadMore,
    hasNextPage,

    data: data?.pages || [],
    isLoading,
    error,
    refetch
  }
}