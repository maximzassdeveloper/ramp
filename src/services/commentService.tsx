import { IComment } from '@/types/comment'
import defaultAxios from './axiosService'

interface ICreateCommentProps extends 
  Omit<IComment, 'user' | 'rating' | 'id'> {}

export const commentService = {
  async createComment(comment: ICreateCommentProps) {
    return defaultAxios.post<IComment>('/comments', comment)
  }
}