export interface IFilmBase {
  id: number
  slug: string
  name: string
  type: FilmType
  preview: string
  rating: IRating

  desc?: string
  shortDesc?: string
  year?: number
  ageLimit?: string

  trailers?: IEpisode[]
  categories?: number[]
  details?: IDetails
}

export type FilmType = 'series' | 'movie'

export interface ISeries extends IFilmBase {
  seasons: ISeason[]
}

export interface IMovie extends IFilmBase {
  episode: IEpisode
}

export interface IFilm extends ISeries, IMovie { }

export interface ISeason {
  id: number
  name: string
  episodes: IEpisode[]
  filmId: number
}

export interface IEpisode {
  id: number
  name: string
  timing: string
  preview: string
  video: IVideoSource[]
  filmId: number
  seasonId?: number
}

export interface IDetails {
  createdBy?: string[]
  musicBy?: string[]
  starring?: string[]
  awards?: string[]
}

export interface IRating {
  count: number
  views: number
}

export interface ICategory {
  id: number
  name: string
  slug: string
}

export interface IVideoSource {
  url: string
  type: string
  size: string
}
