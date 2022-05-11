import { FC } from 'react'
import { IComment } from '@/types/comment'
import { Rating } from '@/components'
import s from './comment.module.scss'

interface CommentProps {
  comment: IComment
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className={s.comment}>

      <div className={s.header}>
        <h3>{comment.title}</h3>
        <div className={s.subheader}>
          <span className={s.fullName}>{comment.fullName}</span>
          <Rating ratingNumber={comment.rating} />
        </div>
      </div>  

      <p className={s.body}>{comment.body}</p>

    </div>
  )
}