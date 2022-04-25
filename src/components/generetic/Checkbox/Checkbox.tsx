import { ChangeEvent, memo, useState,forwardRef, InputHTMLAttributes, FocusEvent } from 'react'
import classNames from 'classnames'
import s from './checkbox.module.scss'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string
  value?: string
  className?: string
  checked?: boolean
}

export const Checkbox = memo(forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {

  const { label, value, className, checked, disabled, defaultChecked, onChange, onFocus, onBlur, ...rest } = props

  const [isChecked, setIsChecked] = useState(!!defaultChecked)
  const [isFocused, setIsFocused] = useState(false)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e)
    setIsChecked(e.target.checked)
  }

  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const cls = classNames({
    [s.checkbox]: true,
    [s.checked]: checked === undefined ? isChecked : checked,
    [s.disabled]: disabled,
    [s.focused]: isFocused,
    className
  })

  return (
    <label className={cls}>
      <input 
        ref={ref}
        type='checkbox'
        disabled={disabled}
        value={value}
        checked={checked === undefined ? isChecked : checked}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        {...rest}
      />
      <span className={s.icon}><i className='ph-check' /></span>
      <span className={s.text}>{label}</span>
    </label>
  )
}))