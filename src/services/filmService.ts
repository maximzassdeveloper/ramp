import { AxiosResponse } from 'axios'
import { ICategory, IFilm } from '@/types/film'
import defaultAxios from './axiosService'

export const getFilms = async (params: string = ''): Promise<AxiosResponse<IFilm[]>> => {
  return defaultAxios.get<IFilm[]>(`/films${params}`)
}

export const getFilm = async (slug: string): Promise<AxiosResponse<IFilm[]>> => {
  return defaultAxios.get<IFilm[]>(`/films/${slug}`)
}

export const getCategories = async (): Promise<AxiosResponse<ICategory[]>> => {
  return defaultAxios.get<ICategory[]>('/categories')
}

const filmService = {
  async getFilms(params?: any) {
    return defaultAxios.get<IFilm[]>(`/films`, { params })
  },

  async getCategories() {
    return defaultAxios.get<ICategory[]>('/categories')
  }
}

export default filmService