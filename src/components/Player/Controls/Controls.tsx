import { FC } from 'react'
import { PlayButton } from '../common'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { FullScreen, Time, PlayerSeasons, PlayerSettings, Volume } from '.'
import s from './controls.module.scss'

export const Controls: FC = () => {
  return (
    <div className={s.controls}>
      <ProgressBar />
      <div className={s.controlsBottom}>
        <div className={s.col}>
          <PlayButton />
          <Time />
          <Volume />
        </div>
        <div className={`${s.col} ${s.colSecond}`}>
          <PlayerSeasons />
          <PlayerSettings />
          <FullScreen />
        </div>
      </div>
    </div>
  )
}