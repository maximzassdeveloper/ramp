import { FC, memo, RefObject } from 'react'
import { CSSTransition } from 'react-transition-group'
import s from './common.module.scss'

interface PlayerAlertProps {
  isOpen: boolean
  elRef?: RefObject<any>
  className?: string
}

export const PlayerAlert: FC<PlayerAlertProps> = memo(({ 
  children, isOpen, className, elRef 
}) => {

  const cls = [s.alert]
  if (className) cls.push(className)

  return (
    <CSSTransition 
      in={isOpen} 
      timeout={200}
      classNames='fade' 
      mountOnEnter 
      unmountOnExit
    >
      <div className={cls.join(' ')} ref={elRef}>
        {children}
      </div>
    </CSSTransition>
  )
})