import { FC, useState, useEffect, useRef } from 'react'
import { SettingsItem } from './SettingsItem'
import { SubSettings } from './SubSettings'
import { ISetting } from './PlayerSettings'
import s from './settings.module.scss'

interface SettingsWrapeprProps {
  isOpen: boolean
  settings: ISetting[]
}

export const SettingsWrapepr: FC<SettingsWrapeprProps> = ({ isOpen, settings }) => {

  const [curSetting, setCurSetting] = useState<ISetting | null>(null)
  const [height, setHeight] = useState(0)
  const startHeight = useRef(0)

  const settingsRef = useRef<HTMLDivElement>(null)
  const subSettingsRef = useRef<HTMLDivElement>(null)

  const clickHandler = (name: string) => {
    const set = settings.find(x => x.name === name)
    if (set) setCurSetting(set)
  }

  // Transition change height of container
  useEffect(() => {
    if (!settingsRef.current) return
    if (curSetting) {
      // If subSettings opened
      if (!subSettingsRef.current) return
      const newHeight = subSettingsRef.current.offsetHeight

      if (newHeight > startHeight.current) {
        setHeight(newHeight)
      } else {
        subSettingsRef.current.style.minHeight = startHeight.current + 'px'
      }
    } else {
      // If subSettings closed
      setHeight(startHeight.current)
    }
  }, [curSetting])

  useEffect(() => {
    if (!isOpen) {
      setCurSetting(null)
    }
    if (isOpen && startHeight.current === 0 && settingsRef.current) {
      const h = settingsRef.current.offsetHeight
      setHeight(h)
      startHeight.current = h
    }
  }, [settingsRef, isOpen])

  return (
    <div 
      className={s.settings} 
      ref={settingsRef}
      style={{ height: !!height ? height+'px' : 'auto' }}
    >

      {settings.map(el => 
        <SettingsItem 
          key={el.name}
          name={el.name}
          value={el.value}
          onClick={clickHandler}
        />
      )}

      <SubSettings 
        setting={curSetting} 
        elRef={subSettingsRef} 
        onClick={() => setCurSetting(null)}
      />

    </div>
  )
}