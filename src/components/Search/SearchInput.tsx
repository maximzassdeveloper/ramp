import { FC, ChangeEvent, memo, useState } from 'react'
import { Input, ToggleIcon } from '../generetic'
import s from './search.module.scss'

interface SearchInputProps {
  onChange: (val: string) => void
}

export const SearchInput: FC<SearchInputProps> = memo(({ onChange }) => {

  const [value, setValue] = useState('')

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setValue(e.target.value)
  }

  const cleanHandler = () => {
    onChange('')
    setValue('')
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
        <ToggleIcon toggle={!value.trim()}>
          <i className="ph-magnifying-glass" />
        </ToggleIcon>
        <ToggleIcon toggle={!!value.trim()}>
          <i onClick={cleanHandler} className="ph-x" />
        </ToggleIcon>
      </div>
    </div>
  )
})