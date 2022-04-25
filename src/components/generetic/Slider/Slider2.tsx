import { useRef, useMemo, memo, MouseEventHandler, MouseEvent, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'
import { useDrag } from './useSliderDrag2'
import ownStyles from './slider.module.scss'
import { composeRef } from '@/utils/composeRef'

interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  className?: string
  showLabel?: boolean
  labelValue?: string | number
  styles?: any
  addonAfter?: ReactNode

  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
  onMouseMove?: MouseEventHandler<HTMLDivElement>
  onChange?: (percents: number) => void
}

export const Slider2 = memo(forwardRef<HTMLDivElement, SliderProps>((props, ref) => {

  const { value, className, min = 0, max = 100, step = 1, showLabel = true, labelValue, styles, addonAfter, onChange, onMouseDown, onMouseUp, onMouseMove } = props
  const s = { ...ownStyles, ...styles }

  const sliderRef = useRef<HTMLDivElement>(null)

  const percentsStep = useMemo((): number => {
    // return Math.round(step / (max - min) * 100)
    return +(100 / max).toFixed(1)
  }, [step, max, min])
  
  const calcValueToPercents = (): number => {
    // return +(value / max * 100).toFixed(1)
    return Math.floor(value / max * 100)
  }

  const calcPercentsToValue = (perc: number): number => {
    return Math.floor(max * (perc / 100))
  }

  const onUpdatePercents = () => {
    if (calcValueToPercents() !== percents.current) {
      onChange?.(calcPercentsToValue(percents.current))
    }
  }

  const { percents, onStartMove } = useDrag(sliderRef, percentsStep, onUpdatePercents)

  const mouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    onStartMove(e)
    onMouseDown?.(e)
  }

  return (
    <div 
      ref={composeRef(sliderRef, ref)}
      className={classNames(s.slider, className)} 
      onMouseDown={mouseDownHandler}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className={s.rail} />

      <div 
        className={s.track} 
        style={{ width: `${calcValueToPercents()}%` }}
      />

      <div 
        className={s.handle} 
        style={{ left: `${calcValueToPercents()}%` }}
      >
        {showLabel && <span>{labelValue ?? value}</span>}
      </div>

      {addonAfter}
    </div>
  )
}))