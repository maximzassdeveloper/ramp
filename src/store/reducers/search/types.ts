export interface SearchState {
  isOpen: boolean
}

export enum SearchActionEnum {
  OPEN_SEARCH = 'OPEN_SEARCH',
  CLOSE_SEARCH = 'CLOSE_SEARCH'
}

export interface OpenSearchAction {
  type: SearchActionEnum.OPEN_SEARCH
}

export interface CloseSearchAction {
  type: SearchActionEnum.CLOSE_SEARCH
}

export type SearchAction = OpenSearchAction | CloseSearchAction