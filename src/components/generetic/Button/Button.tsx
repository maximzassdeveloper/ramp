import { FC } from 'react'
import styles from './button.module.scss'

export const Button: FC = () => {
  return (
    <button className={styles.button}>Button</button>
  )
}