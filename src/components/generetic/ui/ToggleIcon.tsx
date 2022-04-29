import { FC, memo } from 'react'
import { CSSTransition } from 'react-transition-group'

interface ToggleIconProps {
  toggle: boolean
}

export const ToggleIcon: FC<ToggleIconProps> = memo(({ children, toggle }) => {
  return (
    <CSSTransition 
      in={toggle} 
      timeout={200} 
      mountOnEnter 
      unmountOnExit
      classNames='icon'
    >
      {children}
    </CSSTransition>
  )
})