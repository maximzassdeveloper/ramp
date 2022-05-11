import { combineReducers } from 'redux'
import { playerReducer } from './player/playerReducer'
import { filmReducer } from './film/filmReducer'
import { searchReducer } from './search/searchReducer'
import { userReducer } from './user/userReducer'

export default combineReducers({
  player: playerReducer,
  film: filmReducer,
  search: searchReducer,
  user: userReducer,
})