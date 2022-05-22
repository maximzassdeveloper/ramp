import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Textarea, Title } from '@/components/generetic'
import { IUser } from '@/types/user'
import { commentService } from '@/services/commentService'
import { IComment } from '@/types/comment'
import s from './add-comment.module.scss'

interface CommentFormProps {
  user: IUser
  filmId: number
  onCreate?: (comment: IComment) => void
}

interface ICommentFormInputs {
  title: string
  fullName: string
  body: string
}

export const CommentForm: FC<CommentFormProps> = ({ user, filmId, onCreate }) => {

  const { control, handleSubmit, reset } = useForm<ICommentFormInputs>()

  const onSubmit = handleSubmit(async ({ title, fullName, body }) => {
    const resp = await commentService.createComment({
      title,
      fullName,
      body,
      userId: user.id,
      filmId
    })
    onCreate?.(resp.data)
    reset()
  })

  return (
    <form className={s.form} onSubmit={onSubmit}>

      <Title level='h3'>Add comment</Title>

      <Controller
        name='title'
        control={control}
        defaultValue=''
        rules={{ required: true }}
        render={({ field, fieldState }) => <Input label='Title' {...field} error={fieldState.error} />}
      />

      <Controller
        name='fullName'
        control={control}
        rules={{ required: true }}
        defaultValue={user?.fullName}
        render={({ field, fieldState }) => <Input 
          label='Full Name' 
          error={fieldState.error} 
          disabled
          {...field} 
        />}
      />

      <Controller
        name='body'
        control={control}
        defaultValue=''
        rules={{ required: true }}
        render={({ field, fieldState }) => <Textarea label='Message' {...field} error={fieldState.error} />}
      />

      <Button type='primary' htmlType='submit'>Submit</Button>
    </form>
  )
}