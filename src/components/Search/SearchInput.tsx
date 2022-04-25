import { FC, useState, ChangeEvent, memo } from 'react'
import { Input, ToggleIcon } from '../generetic'
import s from './search.module.scss'

interface SearchInputProps {
  onChange: (val: string) => void
}

export const SearchInput: FC<SearchInputProps> = memo(({ onChange }) => {

  const [value, setValue] = useState('')

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  const cleanHandler = () => {
    setValue('')
    onChange('')
  }

  return (
    <div className={s.searchInput}>
      <Input 
        className={s.searchInput}
        value={value}
        onChange={changeHandler}
        placeholder='Search'
      />
      <div className={s.inputIcon}>
        <ToggleIcon toggle={!value.trim()}><i className="ph-magnifying-glass"></i></ToggleIcon>
        <ToggleIcon toggle={!!value.trim()}>
          <i onClick={cleanHandler} className="ph-x"></i>
        </ToggleIcon>
      </div>
    </div>
  )
})