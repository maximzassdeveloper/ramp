import { FC } from 'react'
import { useTypedSelector } from '@/hooks'
import { CommentForm } from './CommentForm'
import { NotAuthPlaceholder } from './NotAuthPlaceholder'
import { IComment } from '@/types/comment'
import s from './add-comment.module.scss'
import classNames from 'classnames'

interface AddCommentProps {
  filmId: number
  onCreate?: (comment: IComment) => void
}

export const AddComment: FC<AddCommentProps> = ({ filmId, onCreate }) => {

  const { isAuth, user } = useTypedSelector(s => s.user)

  return (
    <div className={classNames(s.addComment, { [s.notAuth]: !isAuth })}>

      {isAuth && user
        ? <CommentForm 
            user={user} 
            filmId={filmId} 
            onCreate={onCreate}
          />
        : <NotAuthPlaceholder />
      }

    </div>
  )
}