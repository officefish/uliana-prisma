export * from './shop'
export * from './player'
export * from './task'
export * from './quest'

export enum Page {
    SECRET = "secret",
    ROOM = "room",
    MAGIC_BALL = "magic_ball",
    FRIENDS = "friends",
    TASKS = "tasks",

    BAWDRY = "bawdry",
    LANTERN = "lantern",

    MARKUS_ROOM = "markus_room",
    AGATA_ROOM = "agata_room",
}

export interface ITelegramUser {
    playerId: number
    token: string
    fullname?: string
}

export type setBool = (is: boolean) => void
