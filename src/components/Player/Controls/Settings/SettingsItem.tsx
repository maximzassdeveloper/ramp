import { FC } from 'react'
import classNames from 'classnames'
import s from './settings.module.scss'

interface SettingsItemProps {
  value: string
  name: string
  onClick: (name: string) => void
}

export const SettingsItem: FC<SettingsItemProps> = ({ value, name, onClick }) => {
  return (
    <div className={s.settingsItem} onClick={() => onClick(name)}>
      <h4>{name}</h4>
      <span>{value}</span>
    </div>
  )
}


interface SubSettingsItemProps {
  value: string
  active: boolean
  onClick: (value: string) => void
}

export const SubSettingsItem: FC<SubSettingsItemProps> = ({ 
  value, active, onClick 
}) => {
  return (
    <div 
      className={classNames(s.subSettingsItem, { [s.active]: active })} 
      onClick={() => onClick(value)}
    >
      {active ? <i className='ph-check' /> : ''}
      <span>{value}</span>
    </div>
  )
}