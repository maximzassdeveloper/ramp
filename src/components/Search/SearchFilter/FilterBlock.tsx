import { FC } from 'react'
import s from './search-filter.module.scss'

interface FilterBlockProps {
  title?: string
}   

export const FilterBlock: FC<FilterBlockProps> = ({ children, title }) => {
  return (
    <div className={s.filterBlock}>
      {!!title && <h4>{title}</h4>}
      <div>
        {children}
      </div>
    </div>
  )
}