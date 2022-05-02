import { forwardRef, MouseEventHandler } from 'react'
import { SubSettingsItem } from './SettingsItem'
import { ICurSetting } from './SettingsWrapper'
import cn from 'classnames'
import s from './settings.module.scss'

interface SubSettingsProps {
  setting: ICurSetting | null
  onClick?: MouseEventHandler
}

export const SubSettings = forwardRef<HTMLDivElement, SubSettingsProps>((props, ref) => {

  const { setting, onClick } = props

  return (
    <div ref={ref} className={cn(s.subSettings, { [s.subSettingsActive]: setting })}>

      <div className={s.subSettingsHeader} onClick={onClick}>
        <i className='ph-caret-left' /> 
        <span>{setting?.name || ''}</span>
      </div>

      <div className={s.subSettingsList}>
        {!!setting && setting.options.map((op, i) => 
          <SubSettingsItem 
            key={op+i} 
            value={op} 
            active={op === setting.value}
            onClick={setting.onSelect}
          />
        )}
      </div>

    </div>
  )
})