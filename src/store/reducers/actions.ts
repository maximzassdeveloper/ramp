import { playerActions } from './player/action'
import { filmActions } from './film/action'
import { searchActions } from './search/action'
import { UserActions } from './user/actions'

export const actions = {
  ...playerActions,
  ...filmActions,
  ...searchActions,
  ...UserActions
}