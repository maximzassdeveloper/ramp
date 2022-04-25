import { ChangeEvent, FC, memo } from 'react'
import { FilterBlock } from '../FilterBlock'
import { Checkbox } from '@/components/generetic'

interface TypeFilterProps {
  onChange: (name: string, value: string[]) => void
  value: string[]
}

const list = [
  { label: 'Series', value: 'series' },
  { label: 'Movie', value: 'movie' },
]

export const TypeFilter: FC<TypeFilterProps> = memo(({ onChange, value: types }) => {

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    let newTypes = types
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
      {list.map((ch, i) => 
        <Checkbox 
          key={ch.value + i}
          name={ch.value}
          label={ch.label}
          value={ch.value}
          onChange={checkboxHandler} 
          checked={!!types.find(x => x === ch.value)}
        />
      )}
    </FilterBlock>
  )
})