import { combineReducers } from 'redux'
import { playerReducer } from './player/player'
import { filmReducer } from './film/film'
import { searchReducer } from './search/search'

export default combineReducers({
  player: playerReducer,
  film: filmReducer,
  search: searchReducer
})