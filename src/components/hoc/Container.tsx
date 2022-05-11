import { FC } from 'react'
import classNames from 'classnames'
import s from './hoc.module.scss'

interface ContainerProps {
  className?: string
  center?: boolean
  verticalCenter?: boolean
}

export const Container: FC<ContainerProps> = ({ children, className, center, verticalCenter }) => {
  return (
    <div className={classNames(s.container, className, {
      [s.center]: center,
      [s.verticalCenter]: verticalCenter
    })}>
      {children}
    </div>
  )
}