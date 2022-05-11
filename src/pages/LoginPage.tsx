import { FC } from 'react'
import { LoginForm } from '@/components'
import { Container } from '@/components/hoc'

export const LoginPage: FC = () => {
  return (
    <Container center verticalCenter>
      <LoginForm />
    </Container>
  )
}