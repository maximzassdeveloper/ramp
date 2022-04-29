import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import s from './title.module.scss'

interface TitleProps extends HTMLAttributes<HTMLHeadElement> {
  level?: 'h1' | 'h2' | 'h3'
  center?: boolean
}

export const Title: FC<TitleProps> = ({ children, level = 'h2', center }) => {

  const TagName = level

  const classes = classNames(s.title, s[level], {
    [s.center]: center
  })

  return (
    <TagName className={classes}>
      {children}
    </TagName>
  )
}