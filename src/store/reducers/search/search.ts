import { SearchState, SearchAction, SearchActionEnum } from './types'

const defaultState: SearchState = {
  isOpen: false
}

export const searchReducer = (state = defaultState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchActionEnum.OPEN_SEARCH:
      return { ...state, isOpen: true }
    case SearchActionEnum.CLOSE_SEARCH:
      return { ...state, isOpen: false }
    default:
      return state
  }
}