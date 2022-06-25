import filmService from '@/services/filmService'
import { IFilter, IPaginationLinks, IParams } from './searchTypes'

const defaultLimit = 6

export const fetchSearchFilms = async (params: IParams, pageParam: number) => {
  const resp = await filmService.getFilms({
    ...params,
    _page: pageParam
  })
  const links = parsePaginHeaderLink(resp.headers.link)

  return { films: resp.data, ...links }
}

export const createParams = (inputValue: string, filter: IFilter) => {
  const params: IParams = {}

  if (inputValue.trim()) {
    params['name_like'] = inputValue
  }

  params['_limit'] = defaultLimit

  Object.keys(filter).forEach((name: keyof IFilter) => {
    const value = filter[name]
    if (!value?.length) return

    switch (name) {
      case 'type':
        params['type_like'] = JSON.stringify(value)
        return
      case 'categories':
        params['categoryId_like'] = JSON.stringify(value)
        return
      case 'year':
        params['year_gte'] = value[0]
        params['year_lte'] = value[1]
        return
      case 'rating':
        params['rating.count_gte'] = value[0]
        params['rating.count_lte'] = value[1]
        return
    }
  })

  return params
}

export function parsePaginHeaderLink(link: string | undefined): IPaginationLinks {
  if (!link) return {}

  const links = {} as IPaginationLinks
  const refs = link.split(', ')
  refs.forEach(ref => {
    const splt = ref.split('; ')
    const key = splt[1].replace(/"/g, '').replace('rel=', '') as keyof IPaginationLinks
    const value = splt[0].match(/page=\d/)?.[0] ?? ''

    links[key] = +value.replace('page=', '')
  })
  return links
}