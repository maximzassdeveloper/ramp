import { FC } from 'react'
import s from './hoc.module.scss'

export const Container: FC = ({ children }) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  )
}