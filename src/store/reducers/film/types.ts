import { IFilm } from '@/types/film'

export interface FilmState {
  films: IFilm[]
  isLoading: boolean
  error: string | null

  filtered: IFilm[]
  isFilteredLoading: boolean
  filteredError: string | null
}

export enum FilmActionEnum {
  FETCH_FILMS = 'FETCH_FILMS',
  FETCH_FILMS_SUCCESS = 'FETCH_FILMS_SUCCESS',
  FETCH_FILMS_ERROR = 'FETCH_FILMS_ERROR',

  FETCH_FILTERED_FILMS = 'FETCH_FILTERED_FILMS',
  FETCH_FILTERED_FILMS_SUCCESS = 'FETCH_FILTERED_FILMS_SUCCESS',
  FETCH_FILTERED_FILMS_ERROR = 'FETCH_FILTERED_FILMS_ERROR'
}

export interface FetchFilmsAction {
  type: FilmActionEnum.FETCH_FILMS
}

export interface FetchFilmsSuccessAction {
  type: FilmActionEnum.FETCH_FILMS_SUCCESS
  payload: IFilm[]
}

export interface FetchFilmsErrorAction {
  type: FilmActionEnum.FETCH_FILMS_ERROR
  payload: string
}

export interface FetchFilteredFilmsAction {
  type: FilmActionEnum.FETCH_FILTERED_FILMS
}

export interface FetchFilteredFilmsSuccessAction {
  type: FilmActionEnum.FETCH_FILTERED_FILMS_SUCCESS
  payload: IFilm[]
}

export interface FetchFilteredFilmsErrorAction {
  type: FilmActionEnum.FETCH_FILTERED_FILMS_ERROR
  payload: string
}

export type FilmAction =
  FetchFilmsAction
  | FetchFilmsSuccessAction
  | FetchFilmsErrorAction
  | FetchFilteredFilmsAction
  | FetchFilteredFilmsSuccessAction
  | FetchFilteredFilmsErrorAction