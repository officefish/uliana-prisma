import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IFortuneState, IFortuneActions, IFortune } from './types'
import { IAction } from '@/types/action'

type IFortuneStore = IFortuneState & IFortuneActions

const createFortuneStore = () =>
  createStore<IFortuneStore>()((set) => ({
    fortunes: [],
    setFortunes: (fortunes: IFortune[]) => set(() => ({ fortunes })),
    fortuneAction: null,
    setFortuneAction: (fortuneAction: IAction | null) => set(() => ({ fortuneAction })),
    // Add more fortune-related methods here...
    }))

  type FortuneStore = ReturnType<typeof createFortuneStore>
  const FortuneContext = createContext<FortuneStore | null>(null)

  export const useFortuneStore = () => {
    const api = useContext(FortuneContext) as StoreApi<IFortuneStore>
    return {
      fortunes: useStore(api, (state) => state.fortunes),
      setFortunes: useStore(api, (state) => state.setFortunes),
      fortuneAction: useStore(api, (state) => state.fortuneAction),
      setFortuneAction: useStore(api, (state) => state.setFortuneAction),
      // Add more fortune-related methods here...
    }
  }

  export const FortunesProvider: FC<PropsWithChildren> = ({ children }) => {
    const walletRef = useRef<FortuneStore>()
    if (!walletRef.current) {
      walletRef.current = createFortuneStore()
    }
    return (
      <FortuneContext.Provider value={walletRef.current}>
        {children}
      </FortuneContext.Provider>
    )
  }