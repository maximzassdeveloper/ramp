import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppDispatch } from '@/store'
import { actions } from '@/store/reducers/actions'

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return bindActionCreators(actions, dispatch)
}