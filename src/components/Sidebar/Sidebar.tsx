import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '@/router'
import { useActions, useTypedSelector } from '@/hooks'
import { Search } from '@/components'
import styles from './sidebar.module.scss'

export const Sidebar: FC = () => {

  const { openSearch } = useActions()
  const { isOpen } = useTypedSelector(s => s.search)

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
            onClick={openSearch} 
            className={isOpen ? styles.active : ''}
            data-search-link
          >
            <i className="ph-magnifying-glass" />
          </li>

          <li title='Favourites'>
            <Link to={RouteNames.FAVOURITES}>
              <i className="ph-bookmark-simple" />
            </Link>
          </li>

        </ul>
      </nav>

    </aside>
    <Search />
  </>
}