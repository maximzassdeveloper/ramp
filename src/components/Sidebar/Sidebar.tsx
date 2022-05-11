import { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '@/router'
import { useActions, useTypedSelector } from '@/hooks'
import { Search } from '@/components'
import { RootState } from '@/store'
import styles from './sidebar.module.scss'

const selector = (state: RootState) => ({ ...state.user, ...state.search})

export const Sidebar: FC = () => {

  const { isOpen, isAuth } = useTypedSelector(selector)
  const { openSearch, logout } = useActions()

  const onClickSearchIcon = (e: MouseEvent) => {
    e.stopPropagation()
    openSearch()
  }

  return <>
    <aside className={styles.sidebar}>
      
      <div className={styles.logo}>
        <Link to={RouteNames.HOME}>Rp</Link>  
      </div>

      <nav className={styles.sidebarMenu}>
        <ul>

          <li title='Home'>
            <Link to={RouteNames.HOME}>
              <i className="ph-house" />
            </Link>
          </li>

          <li 
            title='Search' 
            onClick={onClickSearchIcon} 
            className={isOpen ? styles.active : ''}
            data-search-link
          >
            <i className="ph-magnifying-glass" />
          </li>

          {isAuth && <>
            <li title='Favourites'>
              <Link to={RouteNames.FAVOURITES}>
                <i className="ph-bookmark-simple" />
              </Link>
            </li>

            <li title='Logout' onClick={logout}>
              <i className='ph-sign-out' />
            </li>
          </>}

          {!isAuth && <li>
            <Link to={RouteNames.LOGIN}>
              <i className="ph-user" />
            </Link>
          </li>}

        </ul>
      </nav>

    </aside>
    <Search />
  </>
}