import { FC, useMemo } from 'react'
import { useActions } from '@/hooks/useActions'
import { IEpisode, IFilm } from '@/types/film'
import { combineStyles } from '@/utils/combineStyles'
import cn from 'classnames'
import styles from './episode.module.scss'

interface EpisodeProps {
  episode: IEpisode
  count: number
  film: IFilm
  className?: string
  classes?: any
}

export const Episode: FC<EpisodeProps> = ({ episode, count, film, className, classes }) => {

  const s = useMemo(() => combineStyles(styles, classes), [classes])
  const { openPlayer } = useActions()

  const onClick = () => {
    openPlayer({ episode, film })
  }

  return <>
    <div className={cn(s.episode, className)}>
      <div className={s.image} onClick={onClick}>
        <img src={episode.preview} alt={episode.name} />
      </div>
      <div className={s.content}>
        <span className={s.count}>{count}</span>
        <div>
          <h3 className={s.title}>{episode.name}</h3>
          <span className={s.timing}>{episode.timing}</span>
        </div>
      </div>
    </div>
  </>
}