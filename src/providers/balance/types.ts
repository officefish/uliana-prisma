

export interface IBalanceState {
    coins: number,
    energy: number,
    gems: number,
    crystals: number    
}
   
export interface IBalanceActions {
    setCoins: (coins: number) => void
    setEnergy: (energy: number) => void
    setGems: (gems: number) => void
    setCrystals: (crystals: number) => void
}