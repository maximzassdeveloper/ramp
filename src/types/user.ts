import { IComment } from './comment'

export interface IUser {
  id: number
  fullName: string
  email: string
  password: string
  comments?: IComment[]
}