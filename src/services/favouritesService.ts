import { IFilm } from '@/types/film'

const NAME = 'favourites'

export const getFavourites = (): IFilm[] => {
  return JSON.parse(localStorage.getItem(NAME) || '[]')
}

export const addFavourite = (film: IFilm) => {
  const fav = getFavourites()
  fav.unshift(film)
  localStorage.setItem(NAME, JSON.stringify(fav))
}

export const deleteFavourite = (id: number) => {
  const fav = getFavourites().filter(i => i.id !== id)
  localStorage.setItem(NAME, JSON.stringify(fav))
}

export const inFavourites = (id: number): boolean => {
  return !!getFavourites().find(i => i.id === id)
}