import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Input, Button, Title } from '@/components/generetic'
import { RouteNames } from '@/router'
import { validateEmail } from '@/utils/helper'
import { useActions, useTypedSelector } from '@/hooks'
import s from './auth-forms.module.scss'

interface ILoginInputs {
  email: string
  password: string
}

export const LoginForm: FC = () => {

  const { isLoading, error } = useTypedSelector(s => s.user)
  const { login } = useActions()
  const history = useHistory()
  const { handleSubmit, control } = useForm<ILoginInputs>({defaultValues: {
    email: '',
    password: ''
  }})

  const onSubmit = handleSubmit(data => {
    login(data)
    history.goBack()
  })

  return (
    <div className={s.formWrapper}>
      <Title>Login</Title>
      <form className={s.form} onSubmit={onSubmit}>

        <Controller
          name='email'
          control={control}
          rules={{ 
            required: true, 
            validate: v => validateEmail(v) || 'Incorrect email' }
          }
          render={({ field, fieldState }) => <Input label='Email' {...field} error={fieldState.error} />}
        />
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => <Input.Password label='Password' {...field} error={fieldState.error} />}
        />

        <Button 
          className={s.submit}
          htmlType='submit' 
          type='primary'
          loading={isLoading}
          >
          Submit
        </Button>

        {error && <span className={s.formError}>{error}</span>}
        
        <div className={s.links}>
          <Link to={RouteNames.REGISTER}>Register</Link>
        </div>
      </form>
    </div>
  )
}