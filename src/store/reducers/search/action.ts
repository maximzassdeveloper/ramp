import { CloseSearchAction, OpenSearchAction, SearchActionEnum } from './types'

export const searchActions = {
  openSearch: (): OpenSearchAction => {
    document.body.style.overflowY = 'hidden'
    return { type: SearchActionEnum.OPEN_SEARCH }
  },
  closeSearch: (): CloseSearchAction => {
    document.body.style.overflowY = 'auto'
    return { type: SearchActionEnum.CLOSE_SEARCH }
  }
}