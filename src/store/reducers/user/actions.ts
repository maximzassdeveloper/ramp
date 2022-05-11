import userService, { ILoginData, IRegisterData } from '@/services/userService'
import { AppDispatch } from '@/store'
import { IUser } from '@/types/user'
import { UserActionEnum, SetUserAction, SetAuthAction, SetLoadingAction, SetErrorAction } from './types'

export const UserActions = {
  setUser: (user: IUser | null): SetUserAction => ({ type: UserActionEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): SetAuthAction => ({ type: UserActionEnum.SET_AUTH, payload: auth }),
  setIsLoading: (payload: boolean): SetLoadingAction => ({ type: UserActionEnum.SET_LOADING, payload }),
  setError: (payload: string): SetErrorAction => ({ type: UserActionEnum.SET_ERROR, payload }),

  login: ({ email, password }: ILoginData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(UserActions.setIsLoading(true))
      const { data } = await userService.login({ email, password })

      localStorage.setItem('auth', 'true')
      localStorage.setItem('user', JSON.stringify(data))
      dispatch(UserActions.setUser(data))
      dispatch(UserActions.setIsAuth(true))

    } catch (e) {
      dispatch(UserActions.setError(e.message || 'Login error'))
    }
  },

  register: ({ email, password, fullName }: IRegisterData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(UserActions.setIsLoading(true))
      const { data } = await userService.register({ email, password, fullName })

      localStorage.setItem('auth', 'true')
      localStorage.setItem('user', JSON.stringify(data))
      dispatch(UserActions.setUser(data))
      dispatch(UserActions.setIsAuth(true))

    } catch (e) {
      dispatch(UserActions.setError(e.message || 'Register error'))
    }
  },

  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    dispatch(UserActions.setUser(null))
    dispatch(UserActions.setIsAuth(false))
  }
}