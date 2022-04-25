import { OpenPlayerAction, ClosePlayerAction, PlayerActionEnum, OpenPlayerPayload } from './types'

export const playerActions = {
  openPlayer: (data: OpenPlayerPayload): OpenPlayerAction => ({ 
    type: PlayerActionEnum.OPEN_PLAYER, 
    payload: data 
  }),
  closePlayer: (): ClosePlayerAction => ({ 
    type: PlayerActionEnum.CLOSE_PLAYER 
  })
}