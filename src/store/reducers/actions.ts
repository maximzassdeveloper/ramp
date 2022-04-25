import { playerActions } from './player/action'
import { filmActions } from './film/action'
import { searchActions } from './search/action'

export const actions = {
  ...playerActions,
  ...filmActions,
  ...searchActions
}