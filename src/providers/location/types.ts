import { ILocation } from "@/types/location"

export interface ILocationState {
    location: ILocation | null  
}
   
export interface ILocationActions {
    setLocation: (location: ILocation | null) => void
}