import { ChangeEvent, forwardRef, useRef, useState } from 'react'
import classNames from 'classnames'
import { composeRef } from '@/utils/composeRef'
import { Input, InputProps } from './Input'
import s from './input.module.scss'

interface InputNumberProps extends Omit<InputProps, 'onChange'> {
  showArrows?: boolean
  onChange?: (val: number | string) => void
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {

  const { className, value: outValue, onChange, defaultValue, showArrows = true, min = 0, max = 10000, step = 1, ...rest } = props

  const [value, setValue] = useState(defaultValue || min || 0)
  const inputRef = useRef<HTMLInputElement>(null)

  const checkValue = (val: typeof defaultValue) => {
    if (!val) return ''

    if (val < min) val = min
    if (val > max) val = max

    return val
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(checkValue(+e.target.value))
    if (onChange) onChange(+e.target.value)
  }

  const clickArrow = (dir: 'up' | 'down') => {
    inputRef.current?.focus()
    const v = dir === 'up' ? +value + +step : +value - +step
    setValue(checkValue(v))
    if (onChange) onChange(checkValue(v))
  }

  const renderArrows = () => (
    <div className={s.inputNumberArrows}>
      <div className={s.inputNumberArrow} onClick={() => clickArrow('up')}>
        <i className="ph-caret-up"></i>
      </div>
      <div className={s.inputNumberArrow} onClick={() => clickArrow('down')}>
        <i className="ph-caret-down"></i>
      </div>
    </div>
  )

  return (
    <Input 
      ref={composeRef(inputRef, ref)}
      type='number'
      value={outValue ? outValue : value}
      className={classNames([s.inputNumber], className)}
      onChange={changeHandler}
      addonAfter={showArrows ? renderArrows() : null}
      {...rest} 
    />
  )
})
