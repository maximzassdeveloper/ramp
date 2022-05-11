import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'
import s from './button.module.scss'
import { Loader } from '@/components/Loader'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  className?: string
  icon?: ReactNode
  type?: 'primary' | 'default'
  size?: 'small' | 'middle' | 'large'
  loading?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

  const { children, className, icon, loading, size = 'middle', type = 'default', htmlType, ...rest } = props

  const classes = classNames(s.button, className, s[type], s[size], {
    [s.onlyIcon]: !!icon && !children,
    [s.buttonLoading]: loading
  })

  return (
    <button 
      ref={ref}
      type={htmlType}
      className={classes}
      {...rest}
    > 
      {loading && <span className={s.loader}><Loader isLoading={loading} /></span>}
      {icon && <div className={s.icon}>{icon}</div>}
      {children}
    </button>
  )
})