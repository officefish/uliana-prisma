import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IActionsState, IActionsActions } from './types'
import { IAction } from '@/types/action'
//import {  } from '@/types/action'

type IActionsStore = IActionsState & IActionsActions

const createActionsStore = () =>
  createStore<IActionsStore>()((set) => ({
    entryAction: null,
    setEntryAction: (entryAction: IAction) => set(() => ({ entryAction })),
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
      entryAction: useStore(api, (state) => state.entryAction),
      setEntryAction: useStore(api, (state) => state.setEntryAction),
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