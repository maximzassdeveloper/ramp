import { IFilter } from './SearchFilter'

export const createUrl = (value: string, filter: IFilter): string => {
  let params: string[] = []

  Object.keys(filter).forEach(name => {
    switch (name) {

      case 'type':
        if (filter[name].length === 0) return
        return params.push(filter[name].map((i: string) => `type=${i}`).join('&'))

      case 'categories':
        if (filter[name].length === 0) return
        const cats = filter[name].join('|')
        return params.push(`categories_like=${cats}`)

      case 'rating':
        const r = filter[name]
        if (!r[0] || !r[1]) return
        return params.push(`rating.count_gte=${r[0]}&rating.count_lte=${r[1]}`)

      case 'year':
        const y = filter[name]
        if (!y[0] || !y[1]) return
        return params.push(`year_gte=${y[0]}&year_lte=${y[1]}`)

      default:
        return
    }
  })  
  
  return `?${!!value ? `name_like=${value}` : ''}&${params.join('&')}`
}