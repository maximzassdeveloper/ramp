import { FC } from 'react'
import { ISeason } from '@/types/film'
import classNames from 'classnames'
import s from './seasons.module.scss'

interface SeasonsMenuProps {
  seasons: ISeason[]
  activeSeason: ISeason
  onSelect: (id: number) => void
}

export const SeasonsMenu: FC<SeasonsMenuProps> = ({ seasons, activeSeason, onSelect }) => {

  const renderList = () => {
    return seasons.map((season, index) => (
      <div 
        key={season.id}
        onClick={() => onSelect(season.id)} 
        className={classNames(
          s.menuItem, 
          { [s.menuItemSelected]: season.id === activeSeason.id }
        )}
      >
        {index+1}
      </div>
    ))
  }

  return (
    <div className={s.menu}>
      <h2 className={s.title}>{activeSeason.name}</h2>

      {seasons.length > 1 && 
        <div className={s.menuList}>
          {renderList()}
        </div>}
    </div>
  )
}