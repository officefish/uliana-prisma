import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IFortuneState, IFortuneActions, IFortune } from './types'

type IFortuneStore = IFortuneState & IFortuneActions

const createFortuneStore = () =>
  createStore<IFortuneStore>()((set) => ({
    fortunes: [],
    setFortunes: (fortunes: IFortune[]) => set(() => ({ fortunes })),
    }))

  type FortuneStore = ReturnType<typeof createFortuneStore>
  const FortuneContext = createContext<FortuneStore | null>(null)

  export const useFortuneStore = () => {
    const api = useContext(FortuneContext) as StoreApi<IFortuneStore>
    return {
      fortunes: useStore(api, (state) => state.fortunes),
      setFortunes: useStore(api, (state) => state.setFortunes),
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