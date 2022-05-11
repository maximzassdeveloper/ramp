import { IUser } from '@/types/user'

export interface UserState {
  user: IUser | null
  isLoading: boolean
  error: string
  isAuth: boolean
}

export enum UserActionEnum {
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_AUTH = 'SET_AUTH'
}

export interface SetUserAction {
  type: UserActionEnum.SET_USER
  payload: IUser | null
}

export interface SetLoadingAction {
  type: UserActionEnum.SET_LOADING
  payload: boolean
}

export interface SetErrorAction {
  type: UserActionEnum.SET_ERROR
  payload: string
}

export interface SetAuthAction {
  type: UserActionEnum.SET_AUTH
  payload: boolean
}

export type UserAction =
  SetUserAction |
  SetLoadingAction |
  SetAuthAction |
  SetErrorAction

