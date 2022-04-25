import { FC, useRef, useEffect } from 'react'

interface SingleFilmProps {
  activeTab: number
  onChange: (tab: number) => void
}

const nav = ['Overview', 'Episodes', 'Details']

export const SingleFilmNav: FC<SingleFilmProps> = ({ activeTab, onChange }) => {

  const activeLine = useRef<HTMLDivElement>(null)
  const activeEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeLine.current || !activeEl.current) return
    activeLine.current.style.width = activeEl.current.offsetWidth + 'px'
    activeLine.current.style.left = activeEl.current.offsetLeft + 'px'
  }, [activeTab, activeEl])

  return (
    <div className="single-film-nav">
      <div ref={activeLine} className="single-film-nav__line"></div>
      {nav.map((item, index) => 
        <div 
          key={index}
          onClick={() => onChange(index)}
          ref={index === activeTab ? activeEl : null}
          className={`single-film-nav__item${index === activeTab ? ' active' : ''}`}
        >
          {item}
        </div>
      )}
    </div>  
  )
}