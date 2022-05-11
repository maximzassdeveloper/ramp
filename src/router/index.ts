import React from 'react'
import * as pages from '@/pages'

export interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}

export enum RouteNames {
  HOME = '/',
  FAVOURITES = '/favourites',
  FILM = '/film',
  LOGIN = '/login',
  REGISTER = '/register'
}

export const routes: IRoute[] = [
  { path: RouteNames.HOME, component: pages.Home, exact: true },
  { path: RouteNames.FAVOURITES, component: pages.Favourites },
  { path: `${RouteNames.FILM}/:slug`, component: pages.SingleFilmPage },
  { path: `${RouteNames.LOGIN}`, component: pages.LoginPage },
  { path: `${RouteNames.REGISTER}`, component: pages.RegisterPage },
]