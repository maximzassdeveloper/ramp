import { forwardRef, memo, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import s from './common.module.scss'

interface PlayerAlertProps {
  isOpen: boolean
  className?: string
  children?: ReactNode
}

export const PlayerAlert = memo(forwardRef<HTMLDivElement, PlayerAlertProps>((props, ref) => {

  const { children, isOpen, className } = props

  return (
    <CSSTransition 
      in={isOpen} 
      timeout={200}
      classNames='fade' 
      mountOnEnter 
      unmountOnExit
    >
      <div className={classNames(s.alert, className)} ref={ref}>
        {children}
      </div>
    </CSSTransition>
  )
}))