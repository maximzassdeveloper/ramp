import { FC } from 'react'
import { ISeason } from '@/types/film'
import styles from './seasons.module.scss'

interface SeasonsMenuProps {
  seasons: ISeason[]
  activeSeason: ISeason
  onSelect: (id: number) => void
}

export const SeasonsMenu: FC<SeasonsMenuProps> = ({ seasons, activeSeason, onSelect }) => {

  const renderList = () => {
    return seasons.map((season, index) => {

      const cls = [styles.menuItem]
      if (season.id === activeSeason.id) cls.push(styles.menuItemSelected)

      return <div 
        key={season.id}
        onClick={() => onSelect(season.id)} 
        className={cls.join(' ')}
      >
        {index+1}
      </div>
    })
  }

  return (
    <div className={styles.menu}>
      <h2 className={styles.title}>{activeSeason.name}</h2>

      {seasons.length > 1 && 
        <div className={styles.menuList}>
          {renderList()}
        </div>}
    </div>
  )
}