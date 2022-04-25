import { forwardRef, ReactNode, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import s from './input.module.scss'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  value?: InputHTMLAttributes<HTMLInputElement>['value']
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  defaultValue?: string | number
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(( props, ref ) => {

  const { className, value, type = 'text', autoComplete = 'off', addonAfter, addonBefore, ...rest } = props

  return (
    <div className={classNames([s.input], className)}>
      {addonBefore}
      <input 
        ref={ref}
        type={type}
        autoComplete={autoComplete}
        value={value}
        {...rest}
      />
      {addonAfter}
    </div>
  )
})