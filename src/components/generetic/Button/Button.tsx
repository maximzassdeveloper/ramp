import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'
import s from './button.module.scss'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  className?: string
  icon?: ReactNode
  type?: 'primary' | 'default'
  size?: 'small' | 'middle' | 'large'
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

  const { children, className, icon, size = 'middle', type = 'default', htmlType, ...rest } = props

  const classes = classNames(s.button, className, s[type], s[size], {
    [s.onlyIcon]: !!icon && !children
  })

  return (
    <button 
      ref={ref}
      type={htmlType}
      className={classes}
      {...rest}
    >
      {icon && <div className={s.icon}>{icon}</div>}
      {children}
    </button>
  )
})