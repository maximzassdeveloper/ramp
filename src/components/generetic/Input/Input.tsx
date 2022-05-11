import { forwardRef, ReactNode, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { FieldError } from 'react-hook-form'
import s from './input.module.scss'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  value?: string | number
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  label?: string
  defaultValue?: string | number
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  className?: string
  error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, InputProps>(( props, ref ) => {

  const { className, value, label, type = 'text', error, autoComplete = 'off', addonAfter, addonBefore, ...rest } = props
  const LabelTag = label ? 'label' : 'div'

  return (
    <div className={classNames([s.input], className, { [s.inputError]: error?.message })}>
      {addonBefore}
      <LabelTag>
        {label && <span className={s.label}>{label}</span>} 
        <input 
          ref={ref}
          type={type}
          autoComplete={autoComplete}
          value={value}
          {...rest}
        />
      </LabelTag>
      {error && <span className={s.error}>{error.message}</span>}
      {addonAfter}
    </div>
  )
})