import { IFilm } from '@/types/film'

export interface IFetchedData extends IPaginationLinks {
  films: IFilm[]
}

export interface IParams {
  [key: string]: any
}

export interface IFilter {
  type: string[]
  categories: number[]
  rating: number[]
  year: number[]
}

export interface IPaginationLinks {
  next?: number
  prev?: number
  last?: number
}