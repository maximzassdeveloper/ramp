import { FC, memo, useEffect, useState } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ISeason } from '@/types/film'
import { ClosePlayer } from './common'
import styles from './player.module.scss'

export const PlayerHeader: FC = memo(() => {

  const { film, episode } = useTypedSelector(s => s.player)
  const [season, setSeason] = useState<ISeason | null>(null)
  const [episodeNum, setEpisodeNum] = useState<number | null>(null)

  useEffect(() => {
    if (film && episode && episode.seasonId) {
      const curSeason = film.seasons?.find(s => s.id === episode.seasonId)
      if (curSeason) {
        const num = curSeason.episodes.findIndex(ep => ep.id === episode.id)
        setEpisodeNum(num >= 0 ? num+1 : null)
        setSeason(curSeason)
      }
    }
  }, [episode])

  return (
    <div className={styles.playerHeader}>
      <div>
        {episode && <h3>{(episodeNum ? episodeNum+'. ' : '') + episode.name}</h3>}
        {season && <span>{season.name}</span>}
      </div>
      <ClosePlayer />
    </div>
  )
})