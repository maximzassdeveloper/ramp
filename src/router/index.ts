import React from 'react'
import * as pages from '@/pages'

export interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}

export enum RouteNames {
  HOME = '/',
  BOOKMARKS = '/bookmarks',
  FILM = '/film'
}

export const routes: IRoute[] = [
  { path: RouteNames.HOME, component: pages.Home, exact: true },
  { path: RouteNames.BOOKMARKS, component: pages.Bookmarks },
  { path: `${RouteNames.FILM}/:slug`, component: pages.SingleFilmPage }
]