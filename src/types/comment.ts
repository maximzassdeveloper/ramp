import { IUser } from './user'

export interface IComment {
  id: number
  userId: number
  filmId: number
  title: string
  fullName: string
  body: string
  rating?: number
  user?: IUser
}