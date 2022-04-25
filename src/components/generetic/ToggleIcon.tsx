import { FC, memo, MouseEventHandler, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'

interface ToggleIconProps {
  toggle: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const ToggleIcon: FC<ToggleIconProps> = memo(({ children, toggle, className, onClick }) => {

  // const renderIcon = (toggle: boolean, html: ReactNode) => (
  //   <CSSTransition 
  //     in={toggle} 
  //     timeout={150} 
  //     mountOnEnter 
  //     unmountOnExit
  //     classNames='icon'
  //   >
  //     {html}
  //   </CSSTransition>
  // )

  // return (
  //   <div className={className} onClick={onClick}>
  //     {renderIcon(toggle, <i className='ph-pause-fill'></i> )}
  //     {renderIcon(!toggle, <i className='ph-play-fill'></i> )}
  //   </div>
  // )

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