import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { ILocationState, ILocationActions } from './types'
import { ILocation } from '@/types/location'

type ILocationStore = ILocationState & ILocationActions

const createProviderStore = () =>
  createStore<ILocationStore>()((set) => ({
    location: null,
    setLocation: (location: ILocation | null) => set(() => ({ location })),
    }))

  type ProviderStore = ReturnType<typeof createProviderStore>
  const ProviderContext = createContext<ProviderStore | null>(null)

  export const useLocationStore = () => {
    const api = useContext(ProviderContext) as StoreApi<ILocationStore>
    return {
      location: useStore(api, (state) => state.location),
      setLocation: useStore(api, (state) => state.setLocation),
      // Add more location-related methods here...
    }
  }

  export const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<ProviderStore>()
    if (!ref.current) {
      ref.current = createProviderStore()
    }
    return (
      <ProviderContext.Provider value={ref.current}>
        {children}
      </ProviderContext.Provider>
    )
  }