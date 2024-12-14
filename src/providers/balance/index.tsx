import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IBalanceActions, IBalanceState } from './types'

type IBalanceStore = IBalanceState & IBalanceActions

const createBalanceStore = () =>
  createStore<IBalanceStore>()((set) => ({
    coins: 999,
    setCoins: (coins: number) => set(() => ({ coins })),
    energy: 999,
    setEnergy: (energy: number) => set(() => ({ energy })),
    gems: 999,
    setGems: (gems: number) => set(() => ({ gems })),
    crystals: 999,
    setCrystals: (crystals: number) => set(() => ({ crystals })),
  }))

  type BalanceStore = ReturnType<typeof createBalanceStore>
  const BalanceContext = createContext<BalanceStore | null>(null)

  export const useBalanceStore = () => {
    const api = useContext(BalanceContext) as StoreApi<IBalanceStore>
    return {
      coins: useStore(api, (state) => state.coins),
      setCoins: useStore(api, (state) => state.setCoins),
      energy: useStore(api, (state) => state.energy),
      setEnergy: useStore(api, (state) => state.setEnergy),
      gems: useStore(api, (state) => state.gems),
      setGems: useStore(api, (state) => state.setGems),
      crystals: useStore(api, (state) => state.crystals),
      setCrystals: useStore(api, (state) => state.setCrystals),
    }
  }

    export const BalanceProvider: FC<PropsWithChildren> = ({ children }) => {
      const balanceRef = useRef<BalanceStore>()
      if (!balanceRef.current) {
        balanceRef.current = createBalanceStore()
      }
      return (
        <BalanceContext.Provider value={balanceRef.current}>
          {children}
        </BalanceContext.Provider>
      )
    }

  