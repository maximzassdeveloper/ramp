import { FC, MouseEvent } from 'react'
import cn from 'classnames'
import s from './ui.module.scss'

interface CloseIconProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  className?: string
}

export const CloseIcon: FC<CloseIconProps> = ({ onClick, className }) => {
  return (
    <div className={cn(s.closeIcon, className)} onClick={onClick}>
      <i className='ph-x' />
    </div>
  )
}