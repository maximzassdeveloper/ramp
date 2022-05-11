import { FC, useRef, useEffect, useMemo, memo } from 'react'
import { FilmType } from '@/types/film'
import { SingleFilmTab } from './SingleFilmScreen'
import s from './single-film.module.scss'

interface NavigationProps {
  activeTab: SingleFilmTab
  filmType: FilmType
  onChange: (tab: SingleFilmTab) => void
}

export const Navigation: FC<NavigationProps> = memo(({ activeTab, filmType, onChange }) => {

  const underline = useRef<HTMLDivElement>(null)
  const activeEl = useRef<HTMLDivElement>(null)

  const nav = useMemo(() => {
    const inheritNav: SingleFilmTab[] = ['Overview', 'Episodes', 'Details']
    return inheritNav.filter(i => !(filmType === 'movie' && i === 'Episodes'))
  }, [filmType])

  // Animate line under tabs
  useEffect(() => {
    if (!underline.current || !activeEl.current) return
    underline.current.style.width = activeEl.current.offsetWidth + 'px'
    underline.current.style.left = activeEl.current.offsetLeft + 'px'
  }, [activeTab, activeEl])

  return (
    <div className={s.nav}>
      <div ref={underline} className={s.navUnderline}></div>
      {nav.map(tabName => 
        <div 
          key={tabName}
          ref={tabName === activeTab ? activeEl : null}
          onClick={() => onChange(tabName)}
          className={s.navItem}
        >
          {tabName}
        </div>
      )}
    </div>  
  )
})