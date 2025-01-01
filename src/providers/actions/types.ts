import { IAction } from "@/types/action"

export interface IActionsState {
    actions: IAction[]
    received: IAction[]
    entryAction: IAction | null
}
   
export interface IActionsActions {
    setActions: (actions: IAction[]) => void
    setReceived: (received: IAction[]) => void
    setEntryAction: (action: IAction) => void
}