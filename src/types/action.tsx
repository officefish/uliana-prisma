export interface IActionTemplate {
    id: string;
    priceId: string;
    effectid: string;
    type: string;
    timestamp: Date;
}

export interface IAction {
    id: string;
    playerId: string;
    targetId: string | null;
    templateId: string;
    createdAt: Date;
    uuid: string;
    template: IActionTemplate;
}