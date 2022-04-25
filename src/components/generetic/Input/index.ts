import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Input as DefaultInput, InputProps } from './Input'
import { InputNumber } from './InputNumber'

interface CompountedComponent 
  extends ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>> {
  Number: typeof InputNumber
}

const Input = DefaultInput as CompountedComponent

Input.Number = InputNumber

export default Input