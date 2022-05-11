import { FC } from 'react'
import { IComment } from '@/types/comment'
import { Comment } from '@/components'

interface CommentListProps {
  comments?: IComment[]
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {

  if (!comments) return null

  return (
    <div>
      {comments.map(comment => <Comment comment={comment} />)}
    </div>
  )
}