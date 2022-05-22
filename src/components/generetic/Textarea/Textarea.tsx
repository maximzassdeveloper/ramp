import { FocusEvent, forwardRef, TextareaHTMLAttributes, useState } from 'react'
import { FieldError } from 'react-hook-form'
import classNames from 'classnames'
import s from './textarea.module.scss'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string
  defaultValue?: string
  className?: string
  label?: string
  error?: FieldError
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {

  const { className, error, label, disabled, onFocus, onBlur, ...rest } = props
  const [isFocused, setIsFocused] = useState(false)

  const focusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const blurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const classes = classNames(s.textarea, className, {
    [s.disabled]: disabled,
    [s.focused]: isFocused
  })

  return (
    <div className={classes}>
      {label && <span className={s.label}>{label}</span>} 
      <textarea
        ref={ref}
        disabled={disabled} 
        onFocus={focusHandler}
        onBlur={blurHandler}
        {...rest}
      />
      {error && <span className={s.error}>{error.message}</span>}
    </div>
  )
})