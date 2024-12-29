
export enum RankType {
    SHEETER = 'SHEETER',
    INSTALLER = 'INSTALLER',
    DEALER = 'DEALER',
    MANUFACTURER = 'MANUFACTURER',
}

/* User type */
export interface ITgAccount {
    id: string
    username?: string
    tgId: string
    createdAt: string
    isPremium: false
    imageUrl?: string
    firstName?: string
    lastName?: string
}


export interface IPlayer {
    id: string
    createdAt: string
    active: boolean
    lastLogin: string
    invitedById: string
    referralCode: string
    referrerRewarded: false
    taskDatetime: string
    unsafe: false
    tgAccountId: string
    balanceId: string
    tgAccount?: ITgAccount         
}

export interface IReferral extends Omit<IPlayer,
  'createdAt' |
  'energyLatest' |
  'energyMax' |
  'isPremium' |
  'lastLogin' |
  'lastLogout' |
  'levelId' |
  'rank' |
  'referralProfit' |
  'imageUrl' |
  'active' |
  'invitedById'
  > {}
