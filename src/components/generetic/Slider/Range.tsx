import { forwardRef, useMemo, useRef, MouseEvent, useEffect, useState } from 'react'
import { SliderProps } from './Slider'
import { combineStyles } from '@/utils/combineStyles'
import { composeRef } from '@/utils/composeRef'
import classNames from 'classnames'
import ownStyles from './slider.module.scss'
import { useRange } from './useRange'
import { numTrim } from '@/utils/helper'

interface RangeProps extends Omit<SliderProps, 'value' | 'onChange' | 'labelText'> {
  value: number[]
  labelText?: string[] | number[]
  onChange?: (value: number[]) => void
}

export const Range = forwardRef<HTMLDivElement, RangeProps>((props, ref) => {

  const { value: outValue, className, min = 0, max = 100, step = 1, showLabel = true, labelText, styles, addonAfter, onChange, onMouseDown, ...rest } = props

  const s = useMemo(() => combineStyles(ownStyles, styles), [ownStyles, styles])
  const sliderRef = useRef<HTMLDivElement>(null)
  
  const value = useMemo(() => [numTrim(outValue[0], min, max), numTrim(outValue[1], min, max)], [outValue, min, max])
  const valueRef = useRef(value)
  const [innerValue, setInnerValue] = useState(value)
  

  const calcValueToOffest = (val: number) => {
    return numTrim(Math.round((val - min) / (max - min) * 100), 0, 100)
  }

  const calcValueToWidth = () => {
    return numTrim(Math.round((value[1]-value[0]) / (max - min) * 100), 0, 100)
  }

  const calcOffsetToValue = (off: number) => {
    return Math.round((max - min) * (off / 100) + min)
  }

  const onUpdateOffset = (valueIndex: number) => {
    const newInnerValue = [...innerValue]
    newInnerValue[valueIndex] = calcOffsetToValue(offset.current[valueIndex])

    if (newInnerValue[0] > newInnerValue[1]) newInnerValue.sort((a,b) => a-b)
    setInnerValue(newInnerValue)
    // if (!arrayEquals(valueRef.current, value)) onChange?.(valueRef.current)
  }

  useEffect(() => {
    if (!arrayEquals(innerValue, value)) {
      onChange?.(innerValue)
    }
  }, [innerValue])

  const { offset, onStartMove } = useRange(sliderRef, onUpdateOffset)

  const mouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    onStartMove(e)
    onMouseDown?.(e)
  }

  return (
    <div 
      ref={composeRef(sliderRef, ref)}
      className={classNames(s.slider, className)} 
      onMouseDown={mouseDownHandler}
      {...rest}
    >
      <div className={s.rail} />

      <div 
        className={s.track} 
        data-testid='slider-track'
        style={{ 
          width: `${calcValueToWidth()}%`,
          left: `${calcValueToOffest(value[0])}%` 
        }}
      />

      <div 
        className={s.handle}
        style={{ left: `${calcValueToOffest(value[0])}%` }}
      >
        {showLabel && <span>{labelText?.[0] ?? Math.round(value[0])}</span>}
      </div>

      <div 
        className={s.handle}
        style={{ left: `${calcValueToOffest(value[1])}%` }}
      >
        {showLabel && <span>{labelText?.[1] ?? Math.round(value[1])}</span>}
      </div>

      {addonAfter}
    </div>
  )
})

function arrayEquals(a: any[], b: any[]) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}