import { FC, memo, useState } from 'react'
import { useClickOut } from '@/hooks'
import { PlayerAlert } from '../common/PlayerAlert'
import { SettingsWrapepr } from './SettingsWrapper'
import { usePlayerContext } from '../playerContext'
import s from './settings.module.scss'

export interface ISetting {
  name: string
  value: string
  options: string[]
  func?: (value: string) => void
}

export const PlayerSettings: FC = memo(() => {

  const { video, sources } = usePlayerContext()
  const { ref, isOpen, setIsOpen, sourceRef } = useClickOut()
  const [settings, setSt] = useState<ISetting[]>([
    { 
      name: 'Quality', 
      value: '1080p', 
      options: sources.reduce((t: string[], i) => i.size && !t.includes(i.size) ? [...t, i.size]: t, []),
      func: qualityChange
    },
    { 
      name: 'Speed', 
      value: 'Normal', 
      options: ['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '1.75', '2'],
      func: speedChange 
    },
    { 
      name: 'Subtitles', 
      value: 'Off', 
      options: ['On', 'Off'] ,
      func: subttilesChange
    }
  ])

  const setSettings = (name: string, value: string) => {
    const newSettings = settings.slice(0)
    const i = newSettings.findIndex(x => x.name === name)
    if (i < 0) return
    newSettings[i].value = value
    setSt(newSettings)
  }

  // Functions for settingsItems
  function speedChange (val: string) {
    if (!video.current) return
    if (val === 'Normal') {
      video.current.playbackRate = 1
    } else {
      video.current.playbackRate = +val
    }
    setSettings('Speed', val)
  }
  
  function qualityChange (val: string) {
    setSettings('Quality', val)
  }

  function subttilesChange (val: string) {
    setSettings('Subtitles', val)
  }

  return (
    <div>
      <PlayerAlert elRef={ref} isOpen={isOpen} className={s.alertSettings}>
        <SettingsWrapepr 
          isOpen={isOpen}
          settings={settings}
        />
      </PlayerAlert>

      <div ref={sourceRef} onClick={() => setIsOpen(!isOpen)}>
        <i className="ph-gear-fill"></i>
      </div>
    </div>
  )
})