import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Input as DefaultInput, InputProps } from './Input'
import { InputNumber } from './InputNumber'
import { InputPassword } from './InputPassword'

interface CompountedComponent
  extends ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>> {
  Number: typeof InputNumber
  Password: typeof InputPassword
}

const Input = DefaultInput as CompountedComponent

Input.Number = InputNumber
Input.Password = InputPassword

export default Input