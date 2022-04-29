import { IFilm } from '@/types/film'

const NAME = 'ratings'

export interface IRatingsItem {
  film: IFilm
  rating: number
}

const ratingService = {
  getRatings(): IRatingsItem[] {
    return JSON.parse(localStorage.getItem(NAME) || '[]')
  },

  addRating(film: IFilm, rating: number) {
    const ratings = this.getRatings()
    ratings.unshift({ film, rating })
    localStorage.setItem(NAME, JSON.stringify(ratings))
  },

  deleteRating(id: number) {
    const ratings = this.getRatings().filter(i => i.film.id !== id)
    localStorage.setItem(NAME, JSON.stringify(ratings))
  },

  changeRating(id: number, rating: number) {
    const ratings = this.getRatings()
    const curIndex = ratings.findIndex(i => i.film.id === id)
    if (curIndex === -1) return

    ratings[curIndex] = { ...ratings[curIndex], rating }

    localStorage.setItem(NAME, JSON.stringify(ratings))
  },

  getRating(id: number) {
    const ratings = this.getRatings()
    return ratings.find(i => i.film.id === id)?.rating ?? null
  },

  inRatings(id: number): boolean {
    return !!this.getRatings().find(i => i.film.id === id)
  }
}

export default ratingService
