export interface IAction {
    createdAt: string
    id: string    
    playerId: string
    targetId: string
    templateId: string
    uuid: string
}

export interface IActionsState {
    actions: IAction[]
    received: IAction[]
}
   
export interface IActionsActions {
    setActions: (actions: IAction[]) => void
    setReceived: (received: IAction[]) => void
}