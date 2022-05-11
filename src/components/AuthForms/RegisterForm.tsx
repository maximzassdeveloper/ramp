import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Input, Button, Title } from '@/components/generetic'
import { RouteNames } from '@/router'
import { validateEmail } from '@/utils/helper'
import { useActions, useTypedSelector } from '@/hooks'
import s from './auth-forms.module.scss'

interface IRegisterInputs {
  email: string
  fullName: string
  password: string
}

export const RegisterForm: FC = () => {

  const { isLoading, error } = useTypedSelector(s => s.user)
  const { register } = useActions()
  const history = useHistory()
  const { handleSubmit, control } = useForm<IRegisterInputs>({defaultValues: {
    email: '',
    fullName: '',
    password: ''
  }})

  const onSubmit = handleSubmit(data => {
    register(data)
    history.goBack()
  })

  return (
    <div className={s.formWrapper}>
      <Title>Register</Title>
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
          name='fullName'
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => <Input label='Full name' {...field} error={fieldState.error} />}
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
          <Link to={RouteNames.LOGIN}>Login</Link>
        </div>
      </form>
    </div>
  )
}