
[{"key":"bawdry","price":{"value":1,"type":"GEMS"}}]

export interface IFortunePrice {
    value: number,
    type: "GEMS" | "COINS" | "CRYSTAL" | "ENERGY"
}

export interface IFortune {
    key: string,
    price: IFortunePrice
} 

export interface IFortuneState {
    fortunes: IFortune[]      
}
   
export interface IFortuneActions {
    setFortunes: (fortunes: IFortune[]) => void
}