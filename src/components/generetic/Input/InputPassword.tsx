import classNames from 'classnames'
import { forwardRef, useState } from 'react'
import { Input, InputProps } from './Input'
import s from './input.module.scss'

export const InputPassword = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>((props, ref) => {

  const { className, ...rest } = props
  const [isShow, setIsShow] = useState(false)

  const renderIcon = () => {
    return <div className={s.passwordIcon} onClick={() => setIsShow(prev => !prev)}>
      <i className={isShow ? 'ph-eye-slash' : 'ph-eye'} />
    </div>
  }

  return (
    <Input 
      ref={ref}
      className={classNames(s.inputPassword, className)}
      type={isShow ? 'text' : 'password'}
      addonAfter={renderIcon()}
      {...rest}
    />
  )
})