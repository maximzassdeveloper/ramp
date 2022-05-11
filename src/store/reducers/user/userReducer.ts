import { UserAction, UserActionEnum, UserState } from './types'

const initState: UserState = {
  isAuth: false,
  isLoading: false,
  error: '',
  user: null
}

export const userReducer = (state = initState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionEnum.SET_USER:
      return { ...state, user: action.payload }
    case UserActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    case UserActionEnum.SET_LOADING:
      return { ...state, isLoading: action.payload }
    case UserActionEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false }
    default:
      return state
  }
}