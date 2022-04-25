import { render, screen } from '@testing-library/react'
import { useState } from 'react'
import { mount } from 'enzyme'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {

  it('Check defaultChecked and label', () => {
    const { getByRole } = render(<Checkbox label='Category' defaultChecked />)

    expect(screen.getByText(/Category/i)).toBeInTheDocument
    expect(getByRole('checkbox')).toBeChecked
  })

  it('Should correctly without "checked"', () => {
    const wrapper = mount(<Checkbox label='Category' />)

    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().checked).toEqual(false)
    wrapper.find('input').simulate('change', { target: { checked: true } })
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().checked).toEqual(true)
  })

  it('Should correctly when useState "checked"', () => {
    const Demo = () => {
      const [checked, setChecked] = useState(true)
      return (
        <Checkbox 
          label='Category' 
          checked={checked} 
          onChange={e => setChecked(e.target.checked)} 
        />
      )
    }
    const wrapper = mount(<Demo />)

    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().checked).toEqual(true)
    wrapper.find('input').simulate('change', { target: { checked: false } })
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().checked).toEqual(false)
  })

})