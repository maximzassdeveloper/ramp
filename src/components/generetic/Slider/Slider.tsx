import { classnames } from '@/utils/classnames'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { useDrag } from './useSliderDrag'
import s from './slider.module.scss'

interface HandleProps {
  value: number
  percents: number
}

const Handle: FC<HandleProps> = ({ value, percents }) => {
  return (
    <div 
      className={s.handle} 
      style={{ left: `${percents}%` }}
    >
      <span>{value}</span>
    </div>
  )
}

interface SliderProps {
  defaultValue?: number | number[]
  value?: number | number[]
  range?: boolean
  step?: number
  min?: number
  max?: number
  className?: string
  onChange?: (value: number | number[]) => void
}

export const Slider: FC<SliderProps> = memo(({
  defaultValue, className, step = 1, value: outValue, min = 0, max = 100, range, onChange
}) => {

  const [value, setValue] = useState(min)
  const [value2, setValue2] = useState(max)
  const sliderRef = useRef<HTMLDivElement>(null)

  const updateValue = (who: number) => {
    if (who === 1) {
      const val = Math.round((max - min) * (percents.current / 100) + min)
      setValue(val)
    } else if (who === 2) {
      const val = Math.round((max - min) * (percents2.current / 100) + min)
      setValue2(val)
    }
  }
  
  const percentsStep = useMemo(() => {
    return Math.round(step / (max - min) * 100)
  }, [step, max, min])

  const { onStartMove, percents, percents2 } = useDrag(updateValue, sliderRef, percentsStep, !!range)

  const calcValueToPercents = (val: number): number => {
    return Math.round(val / max * 100)
  }

  useEffect(() => {
    console.log(percents)
  }, [percents.current])

  // useEffect(() => {
  //   const data = range ? [value, value2] : value
  //   if (onChange) onChange(data)
  // }, [value, value2])

  // Function for defaultValue
  const updateValueWithPercents = (val: number | number[], who?: number) => {
    let newVal = Array.isArray(val) ? val[0] : val
    if (val < min) newVal = min
    if (newVal > max) newVal = max
    if (!who || who === 1) {
      setValue(newVal)
      percents.current = calcValueToPercents(newVal)
    } else if (who === 2) {
      setValue2(newVal)
      percents2.current = calcValueToPercents(newVal)
    }
  }
  
  // Check defaultValue
  useEffect(() => {
    if (range) {
      if (Array.isArray(outValue)) {
        updateValueWithPercents(outValue[0], 1)
        updateValueWithPercents(outValue[1], 2)
      } else {
        updateValueWithPercents(outValue || min, 1)
      }
    } else {
      if (!outValue) updateValueWithPercents(max)
      else updateValueWithPercents(outValue)
    }
  }, [outValue])


  return (
    <div 
      ref={sliderRef}
      className={classnames(s.slider, className)} 
      onMouseDown={onStartMove}
    >
      <div className={s.rail} />

      <div 
        className={s.track} 
        style={{ 
          width: range ? `${percents2.current - percents.current}%`: `${percents.current}%`, 
          left: range ? `${percents.current}%` : 0 
        }}
      />

      <Handle value={outValue !== undefined && Array.isArray(outValue) ? outValue[0] : value} percents={percents.current} />
      {range && <Handle value={outValue !== undefined && Array.isArray(outValue) ? outValue[1] : value2} percents={percents2.current} />}
    </div>
  )
})