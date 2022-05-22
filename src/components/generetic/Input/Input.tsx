import { forwardRef, ReactNode, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import classNames from 'classnames'
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

  const { className, value, label, disabled, type = 'text', error, autoComplete = 'off', addonAfter, addonBefore, ...rest } = props
  const LabelTag = label ? 'label' : 'div'

  const classes = classNames([s.input], className, { 
    [s.inputError]: error?.message,
    [s.disabled]: disabled
  })

  return (
    <div className={classes}>
      {addonBefore}
      <LabelTag>
        {label && <span className={s.label}>{label}</span>} 
        <input 
          ref={ref}
          type={type}
          autoComplete={autoComplete}
          value={value}
          disabled={disabled}
          {...rest}
        />
      </LabelTag>
      {error && <span className={s.error}>{error.message}</span>}
      {addonAfter}
    </div>
  )
})