import { IEpisode, IFilm } from '@/types/film'

export interface PlayerState {
  isOpen: boolean
  film: IFilm | null
  episode: IEpisode | null
}

export enum PlayerActionEnum {
  OPEN_PLAYER = 'OPEN',
  CLOSE_PLAYER = 'CLOSE'
}

export interface OpenPlayerPayload {
  film: IFilm
  episode: IEpisode
}

export interface OpenPlayerAction {
  type: PlayerActionEnum.OPEN_PLAYER
  payload: OpenPlayerPayload
}

export interface ClosePlayerAction {
  type: PlayerActionEnum.CLOSE_PLAYER
}

export type PlayerAction = OpenPlayerAction | ClosePlayerAction