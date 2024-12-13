import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IOKXState, IOKXActions } from './types'

type IOKXStore = IOKXState & IOKXActions

const createOKXStore = () =>
  createStore<IOKXStore>()((set) => ({
    isRegistered: false,
    isValidated: false,
    isDeposited: false,
    setIsRegistered: (isRegistered: boolean) => set(() => ({ isRegistered })),
    setIsValidated: (isValidated: boolean) => set(() => ({ isValidated })),
    setIsDeposited: (isDeposited: boolean) => set(() => ({ isDeposited })),
  }))

  type OKXStore = ReturnType<typeof createOKXStore>
  const OKXContext = createContext<OKXStore | null>(null)

  export const useOKXStore = () => {
    const api = useContext(OKXContext) as StoreApi<IOKXStore>
    return {
      isRegistered: useStore(api, (state) => state.isRegistered),
      isValidated: useStore(api, (state) => state.isValidated),
      isDeposited: useStore(api, (state) => state.isDeposited),
      setIsRegistered: useStore(api, (state) => state.setIsRegistered),
      setIsValidated: useStore(api, (state) => state.setIsValidated),
      setIsDeposited: useStore(api, (state) => state.setIsDeposited),
    }
  }

  export const OKXProvider: FC<PropsWithChildren> = ({ children }) => {
    const walletRef = useRef<OKXStore>()
    if (!walletRef.current) {
      walletRef.current = createOKXStore()
    }
    return (
      <OKXContext.Provider value={walletRef.current}>
        {children}
      </OKXContext.Provider>
    )
  }