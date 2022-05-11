import { FC } from 'react'
import { RegisterForm } from '@/components'
import { Container } from '@/components/hoc'

export const RegisterPage: FC = () => {
  return (
    <Container center verticalCenter>
      <RegisterForm />
    </Container>
  )
}