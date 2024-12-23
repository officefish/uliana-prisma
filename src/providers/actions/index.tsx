import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IActionsState, IAction, IActionsActions } from './types'
//import {  } from '@/types/action'

type IActionsStore = IActionsState & IActionsActions

const createActionsStore = () =>
  createStore<IActionsStore>()((set) => ({
    actions: [],
    received: [],
    setActions: (actions: IAction[]) => set(() => ({ actions })),
    setReceived: (received: IAction[]) => set(() => ({ received })),
    }))

  type ActionsStore = ReturnType<typeof createActionsStore>
  const ActionsContext = createContext<ActionsStore | null>(null)

  export const useActionsStore = () => {
    const api = useContext(ActionsContext) as StoreApi<IActionsStore>
    return {
      actions: useStore(api, (state) => state.actions),
      setActions: useStore(api, (state) => state.setActions),
      received: useStore(api, (state) => state.received),
      setReceived: useStore(api, (state) => state.setReceived),
      // Add more fortune-related methods here...
    }
  }

  export const ActionsProvider: FC<PropsWithChildren> = ({ children }) => {
    const walletRef = useRef<ActionsStore>()
    if (!walletRef.current) {
      walletRef.current = createActionsStore()
    }
    return (
      <ActionsContext.Provider value={walletRef.current}>
        {children}
      </ActionsContext.Provider>
    )
  }