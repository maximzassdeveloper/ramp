import { ChangeEvent, FC, memo } from 'react'
import { FilterBlock } from '../FilterBlock'
import { Checkbox } from '@/components/generetic'

interface TypeFilterProps {
  onChange: (name: string, value: string[]) => void
  value: string[]
}

const typesList = [
  { label: 'Series', value: 'series' },
  { label: 'Movie', value: 'movie' },
]

export const TypeFilter: FC<TypeFilterProps> = memo(({ onChange, value: types }) => {

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    let newTypes = [...types]
    if (!checked) {
      newTypes = newTypes.filter(i => i !== value)
    } else {
      const curIndex = newTypes.indexOf(value)
      if (curIndex === -1) newTypes = [...newTypes, value]
    }

    onChange('type', newTypes)
  }

  return (
    <FilterBlock title='Type'>
      {typesList.map((type, i) => 
        <Checkbox 
          key={type.value + i}
          name={type.value}
          label={type.label}
          value={type.value}
          onChange={checkboxHandler} 
          checked={!!types.find(i => i === type.value)}
        />
      )}
    </FilterBlock>
  )
})