import { createContext, useContext, FC, ReactNode, RefObject } from 'react'
import { IVideoSource } from '@/types/film'

export interface IPlayerContext {
  isPlay: boolean
  duration: number
  sources: IVideoSource[]
  changePlay: (flag?: boolean) => void
  video: RefObject<HTMLVideoElement>
  playerRef: RefObject<HTMLDivElement>
}

export const playerContext = createContext<IPlayerContext>({} as IPlayerContext)
export const usePlayerContext = () => useContext(playerContext)

interface PlayerProviderProps {
  children: ReactNode
  value: IPlayerContext
}

export const PlayerProvider: FC<PlayerProviderProps> = ({ children, value }) => {
  return (
    <playerContext.Provider value={value}>
      {children}
    </playerContext.Provider>
  )
}