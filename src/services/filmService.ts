import { ICategory, IFilm } from '@/types/film'
import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = `${process.env.SERVER_URL}`

export const getFilms = async (params: string = ''): Promise<AxiosResponse<IFilm[]>> => {
  return axios.get<IFilm[]>(`/films${params}`)
}

export const getFilm = async (slug: string): Promise<AxiosResponse<IFilm[]>> => {
  return axios.get<IFilm[]>(`/films/${slug}`)
}

export const getCategories = async (): Promise<AxiosResponse<ICategory[]>> => {
  return axios.get<ICategory[]>('/categories')
}