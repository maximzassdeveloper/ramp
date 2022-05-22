import { Button } from '@/components/generetic'
import { RouteNames } from '@/router'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './add-comment.module.scss'

interface NotAuthPlaceholderProps {
  
}

export const NotAuthPlaceholder: FC<NotAuthPlaceholderProps> = () => {
  return (
    <div className={s.notAuthPlaceholder}>
      <div>
        <span>You are not logged in</span>
        <Button type='primary'>
          <Link to={RouteNames.LOGIN}>Login</Link>
        </Button>
      </div>  
    </div>
  )
}