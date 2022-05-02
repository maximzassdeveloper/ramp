import { FC, memo, useState, useEffect } from 'react'
import { useClickOut } from '@/hooks'
import { PlayerAlert } from '../../common'
import { SettingsWrapepr } from './SettingsWrapper'
import { usePlayerContext } from '../../playerContext'
import s from './settings.module.scss'

export type SettingNames = 'Quality' | 'Speed' | 'Subtitles'
export interface ISetting {
  name: SettingNames
  value: string
}

export interface IOption {
  options: string[]
  onSelect: (value: string) => void
}

export interface IOptions extends Record<SettingNames, IOption> {}


const defaultSettings: ISetting[] = [
  { name: 'Quality', value: '' },
  { name: 'Speed', value: 'Normal' },
  { name: 'Subtitles', value: 'Off' }
]

export const PlayerSettings: FC = memo(() => {

  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<ISetting[]>(defaultSettings)
  const [options, setOptions] = useState({} as IOptions)
  const { video, sources, setSource } = usePlayerContext()
  const { ref } = useClickOut(() => setIsOpen(false))

  const setSettingsValue = (name: SettingNames, value: string) => {
    const res = [...settings]
    const curIndex = res.findIndex(i => i.name === name)  
    if (curIndex !== -1) {
      res[curIndex].value = value
      setSettings(res)
    }
  }

  // Functions for change parametrs
  const onQualityChange = (value: string) => {
    const founded = sources.find(i => i.size === value.slice(0, -1))
    if (!founded) return

    setSource(founded)
    setSettingsValue('Quality', value)
  }

  const onSpeedChange = (value: string) => {
    if (!video.current) return
    if (value === 'Normal') {
      video.current.playbackRate = 1
    } else {
      video.current.playbackRate = +value
    }

    setSettingsValue('Speed', value)
  }

  const onSubtitlesChange = (value: string) => {
    setSettingsValue('Subtitles', value)
  }

  // Init Options when change sources list (open new video)
  useEffect(() => {
    const newOptions: IOptions = {
      'Quality': {
        options: sources.map(source => source.size+'p') || [],
        onSelect: onQualityChange
      },
      'Speed': {
        options: ['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '1.75', '2'],
        onSelect: onSpeedChange
      },
      'Subtitles': {
        options: ['On', 'Off'],
        onSelect: onSubtitlesChange
      }
    }
    setOptions(newOptions)
    
    setSettingsValue('Quality', (sources[0]?.size ?? 'Auto')+'p')
    setSettingsValue('Speed', 'Normal')
  }, [sources])

  return (
    <div ref={ref}>
      <PlayerAlert isOpen={isOpen} className={s.alertSettings}>
        <SettingsWrapepr 
          isOpen={isOpen}
          settings={settings}
          options={options}
        />
      </PlayerAlert>

      <div onClick={() => setIsOpen(!isOpen)}>
        <i className="ph-gear-fill"></i>
      </div>
    </div>
  )
})