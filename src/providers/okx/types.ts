
export interface IOKXState {
    isRegistered: boolean
    isValidated: boolean
    isDeposited: boolean      
}
   
export interface IOKXActions {
    setIsRegistered: (isRegistered: boolean) => void
    setIsValidated: (isValidated: boolean) => void
    setIsDeposited: (isDeposited: boolean) => void
}