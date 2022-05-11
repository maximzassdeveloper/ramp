import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Slider2 as DefaultSlider, SliderProps } from './Slider'
import { Range } from './Range'

interface CompountedSlider
  extends ForwardRefExoticComponent<SliderProps & RefAttributes<HTMLDivElement>> {
  Range: typeof Range
}

const Slider = DefaultSlider as CompountedSlider

Slider.Range = Range

export default Slider