import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import {IPlayerState, IPlayerActions } from './types'
import { IPlayer } from '@/types'

type IPlayerStore = IPlayerState & IPlayerActions

const createPlayerStore = () =>
  createStore<IPlayerState>()((set) => ({
    player: null,
    setPlayer: (player: IPlayer) => set(() => ({ player })),
  }))

type Store = ReturnType<typeof createPlayerStore>
const PlayerContext = createContext<Store | null>(null)

//eslint-disable-next-line react-refresh/only-export-components
export const usePlayerStore = () => {
  const api = useContext(PlayerContext) as StoreApi<IPlayerStore>
  return {
    player: useStore(api, (state: IPlayerStore) => state.player),
    setPlayer: useStore(api, (state: IPlayerStore) => state.setPlayer),
  }
}

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const playerRef = useRef<Store>()
  if (!playerRef.current) {
    playerRef.current = createPlayerStore()
  }
  return (
    <PlayerContext.Provider value={playerRef.current}>
      {children}
    </PlayerContext.Provider>
  )
}
