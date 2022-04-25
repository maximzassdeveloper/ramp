import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { FilterBlock } from '../FilterBlock'
import { Checkbox } from '@/components/generetic'
import { ICategory } from '@/types/film'
import { getCategories } from '@/services/filmService'

interface CategoryFilterProps {
  onChange: (name: string, value: string[]) => void
  value: string[]
}

export const CategoryFilter: FC<CategoryFilterProps> = memo(({ onChange, value: cats }) => {

  const [list, setList] = useState<ICategory[]>([])

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    let newCats = cats
    if (!checked) {
      newCats = newCats.filter(i => i !== value)
    } else {
      const curIndex = newCats.indexOf(value)
      if (curIndex === -1) newCats = [...newCats, value]
    }

    onChange('categories', newCats)
  }

  useEffect(() => {
    const g = async () => {
      try {
        setList((await getCategories()).data)
      } catch {
        console.log('Categories not loaded')
      }
    }
    g()
  }, [])

  return (
    <FilterBlock title='Categories'>
      {list.map(ch => 
        <Checkbox 
          key={ch.slug}
          label={ch.name}
          name={ch.slug}
          value={ch.slug}
          onChange={checkboxHandler} 
          checked={!!cats.find(x => x === ch.slug)}
        />
      )}
    </FilterBlock>
  )
})