import { FC, useEffect, useState } from 'react'
import { IComment } from '@/types/comment'
import { Title } from '@/components/generetic'
import { AddComment, CommentList } from '@/components/comments'
import s from './single-film-bottom.module.scss'

interface SingleFilmCommentsProps {
  comments?: IComment[]
  filmId: number
}

export const SingleFilmComments: FC<SingleFilmCommentsProps> = ({ comments: outComments, filmId }) => {

  const [comments, setComments] = useState<IComment[]>([])

  const createHandler = (comment: IComment) => {
    setComments(s => [comment, ...s])
  }

  useEffect(() => {
    if (outComments) setComments(outComments)
  }, [outComments])

  return (
    <div className={s.comments}>
      <Title>Comments ({comments?.length ?? 0})</Title>

      {!comments?.length 
        ? <span>There are no comments yet</span>
        : <CommentList comments={comments} />
      } 

      <AddComment 
        filmId={filmId} 
        onCreate={createHandler}
      />
    </div>
  )
}