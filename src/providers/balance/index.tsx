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

    energyLatest: 0,
    energyMax: 0,
    recoveryRate: 0,
    lastEnergyUpdate: null,
    lastGemReady: null,
    lastCrystalReady: null,    

    setEnergyLatest: (energyLatest: number) => set(() => ({ energyLatest })),
    setEnergyMax: (energyMax: number) => set(() => ({ energyMax })),
    setRecoveryRate: (recoveryRate: number) => set(() => ({ recoveryRate })),
    setLastEnergyUpdate: (lastEnergyUpdate: string | null) => set(() => ({ lastEnergyUpdate })),
    setLastGemReady: (lastGemReady: string | null) => set(() => ({ lastGemReady })),
    setLastCrystalReady: (lastCrystalReady: string | null) => set(() => ({ lastCrystalReady })),
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

      energyLatest: useStore(api, (state) => state.energyLatest),
      setEnergyLatest: useStore(api, (state) => state.setEnergyLatest),
      energyMax: useStore(api, (state) => state.energyMax),
      setEnergyMax: useStore(api, (state) => state.setEnergyMax),
      recoveryRate: useStore(api, (state) => state.recoveryRate),
      setRecoveryRate: useStore(api, (state) => state.setRecoveryRate),
      lastEnergyUpdate: useStore(api, (state) => state.lastEnergyUpdate),
      setLastEnergyUpdate: useStore(api, (state) => state.setLastEnergyUpdate),
      lastGemReady: useStore(api, (state) => state.lastGemReady),
      setLastGemReady: useStore(api, (state) => state.setLastGemReady),
      lastCrystalReady: useStore(api, (state) => state.lastCrystalReady),
      setLastCrystalReady: useStore(api, (state) => state.setLastCrystalReady),
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

  