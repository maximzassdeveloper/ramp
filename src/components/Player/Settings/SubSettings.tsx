import { FC, MouseEventHandler, RefObject } from 'react'
import { ISetting } from './PlayerSettings'
import { SubSettingsItem } from './SettingsItem'
import s from './settings.module.scss'

interface SubSettingsProps {
  setting: ISetting | null
  elRef: RefObject<HTMLDivElement>
  onClick?: MouseEventHandler
}

export const SubSettings: FC<SubSettingsProps> = ({ setting, elRef, onClick }) => {

  const cls = [s.subSettings]
  if (setting) cls.push(s.subSettingsActive)

  return (
    <div className={cls.join(' ')} ref={elRef}>

      <div className={s.subSettingsHeader} onClick={onClick}>
        <i className="ph-caret-left"></i> 
        <span>{setting?.name || ''}</span>
      </div>

      <div className={s.subSettingsList}>
        {!!setting && setting.options.map((op, i) => 
          <SubSettingsItem 
            key={op+i} 
            value={op} 
            active={op === setting.value}
            onClick={setting.func}
          />
        )}
      </div>

    </div>
  )
}