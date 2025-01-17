import { IAction } from "@/types/action"

export interface IActionsState {
    actions: IAction[]
    received: IAction[]
    entryAction: IAction | null
    fairyAction: IAction | null
    mode: "incoming" | "outgoing" | null
}
   
export interface IActionsActions {
    setActions: (actions: IAction[]) => void
    setReceived: (received: IAction[]) => void
    setEntryAction: (action: IAction | null) => void
    setFairyAction: (action: IAction | null) => void
    setMode: (mode: "incoming" | "outgoing" | null) => void
}