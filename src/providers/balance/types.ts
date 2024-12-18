

export interface IBalanceState {
    coins: number,
    energy: number,
    gems: number,
    crystals: number,
    energyLatest: number,
    energyMax: number,
    recoveryRate: number,
    lastEnergyUpdate: string | null,
    lastGemReady: string | null,
    lastCrystalReady: string | null,    
}
   
export interface IBalanceActions {
    setCoins: (coins: number) => void
    setEnergy: (energy: number) => void
    setGems: (gems: number) => void
    setCrystals: (crystals: number) => void

    setEnergyLatest: (energyLatest: number) => void
    setEnergyMax: (energyMax: number) => void
    setRecoveryRate: (rate: number) => void
    setLastEnergyUpdate: (datetime: string | null) => void
    setLastGemReady: (datetime: string | null) => void
    setLastCrystalReady: (datetime: string | null) => void
}