import { getFilms } from '@/services/filmService'
import { Dispatch } from 'redux'
import { FilmAction, FilmActionEnum } from './types'

export const filmActions = {
  fetchFilms: (params?: string) => {
    return async (dispatch: Dispatch<FilmAction>) => {
      try {
        dispatch({ type: FilmActionEnum.FETCH_FILMS })
        const response = await getFilms(params)
        dispatch({
          type: FilmActionEnum.FETCH_FILMS_SUCCESS,
          payload: response.data
        })
      } catch(e) {
        dispatch({
          type: FilmActionEnum.FETCH_FILMS_ERROR,
          payload: 'An error has occurred'
        })
      }
    }
  },
  fetchFilteredFilms: (params?: string) => {
    return async (dispatch: Dispatch<FilmAction>) => {
      try {
        dispatch({ type: FilmActionEnum.FETCH_FILTERED_FILMS })
        const response = await getFilms(params)
        dispatch({
          type: FilmActionEnum.FETCH_FILTERED_FILMS_SUCCESS,
          payload: response.data
        })
      } catch(e) {
        dispatch({
          type: FilmActionEnum.FETCH_FILTERED_FILMS_ERROR,
          payload: 'An error has occurred'
        })
      }
    }
  }
}