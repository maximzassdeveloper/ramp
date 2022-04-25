import { FilmAction, FilmActionEnum, FilmState } from './types'

const initialState: FilmState = {
  films: [],
  isLoading: false,
  error: null,

  filtered: [],
  isFilteredLoading: false,
  filteredError: null,
}

export const filmReducer = (state = initialState, action: FilmAction): FilmState => {
  switch (action.type) {

    case FilmActionEnum.FETCH_FILMS:
      return { ...state, isLoading: true }
    case FilmActionEnum.FETCH_FILMS_SUCCESS: 
      return { ...state, isLoading: false, films: action.payload, error: null }
    case FilmActionEnum.FETCH_FILMS_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    case FilmActionEnum.FETCH_FILTERED_FILMS:
      return { ...state, isFilteredLoading: true }
    case FilmActionEnum.FETCH_FILTERED_FILMS_SUCCESS: 
      return { ...state, isFilteredLoading: false, filtered: action.payload, filteredError: null }
    case FilmActionEnum.FETCH_FILTERED_FILMS_ERROR:
      return { ...state, isFilteredLoading: false, filteredError: action.payload }

    default:
      return state
  }
}