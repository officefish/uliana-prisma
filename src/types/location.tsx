export interface ILocationTemplate {

    id: string;
    priceId: string;
    effectid: string;
    type: string;
    timestamp: string;
}

export interface ILocation {

    id: string;
    playerId: string;
    templateId: string;
    createdAt: string;
    template: ILocationTemplate;
}