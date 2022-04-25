import { useActions } from '@/hooks/useActions'
import { FC, memo } from 'react'
import styles from './common.module.scss'

export const ClosePlayer: FC = memo(() => {

  const { closePlayer } = useActions()

  return (
    <div className={styles.close} onClick={closePlayer}>
      <i className="ph-x-fill"></i>
    </div>
  )
})