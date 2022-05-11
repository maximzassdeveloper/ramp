import { PlayerAction, PlayerActionEnum, PlayerState } from './types'

const initState: PlayerState = {
  isOpen: false,
  film: null,
  episode: null
}

export const playerReducer = (state = initState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case PlayerActionEnum.OPEN_PLAYER: 
      return { ...state, isOpen: true, ...action.payload }
    case PlayerActionEnum.CLOSE_PLAYER: 
      return { ...state, isOpen: false, film: null, episode: null }
    default:
      return state
  }
}