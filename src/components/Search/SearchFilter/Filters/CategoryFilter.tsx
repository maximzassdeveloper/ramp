import { ChangeEvent, FC, memo } from 'react'
import { useQuery } from 'react-query'
import { FilterBlock } from '../FilterBlock'
import { Checkbox } from '@/components/generetic'
import filmService from '@/services/filmService'
import { Loader } from '@/components/Loader'

interface CategoryFilterProps {
  onChange: (name: string, value: number[]) => void
  value: number[]
}

export const CategoryFilter: FC<CategoryFilterProps> = memo(({ onChange, value: categories }) => {

  const { data: categoriesList, isLoading } = useQuery('get search categories', () => filmService.getCategories(), {
    select: resp => resp.data,
    refetchOnMount: false
  })

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    let newCats = [...categories]
    if (!checked) {
      newCats = newCats.filter(i => i !== +value)
    } else {
      const curIndex = newCats.indexOf(+value)
      if (curIndex === -1) newCats = [...newCats, +value]
    }

    onChange('categories', newCats)
  }

  return (
    <FilterBlock title='Categories'>
      {isLoading && <Loader isLoading={isLoading} />}
      {!isLoading && categoriesList?.map(category => 
        <Checkbox 
          key={category.slug}
          label={category.name}
          name={category.slug}
          value={category.id.toString()}
          onChange={checkboxHandler} 
          checked={!!categories.find(i => i === category.id)}
        />
      )}
    </FilterBlock>
  )
})