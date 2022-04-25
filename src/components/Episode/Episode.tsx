import { FC } from 'react'
import { useActions } from '@/hooks/useActions'
import { IEpisode, IFilm } from '@/types/film'
import s from './episode.module.scss'

interface EpisodeProps {
  episode: IEpisode
  count: number
  film: IFilm
  className?: string
}

export const Episode: FC<EpisodeProps> = ({ episode, count, film, className }) => {

  const { openPlayer } = useActions()

  const onClick = () => {
    openPlayer({ episode, film })
  }

  const cls = [s.episode]
  if (className) cls.push(className)

  return <>
    <div className={cls.join(' ')}>
      <div className={s.image} onClick={onClick}>
        <img src={episode.preview} alt='' />
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