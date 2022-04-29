import cn from 'classnames'
import { FC } from 'react'
import s from './ui.module.scss'

interface CloseIconProps {
  onClick?: () => void
  className?: string
}

export const CloseIcon: FC<CloseIconProps> = ({ onClick, className }) => {
  return (
    <div className={cn(s.closeIcon, className)} onClick={onClick}>
      <i className='ph-x' />
    </div>
  )
}