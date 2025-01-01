import { IPlayer } from "@/types"

  export interface IPlayerState {
    player: IPlayer | null
  }

  export interface IPlayerActions {
    setPlayer: (player: IPlayer) => void
  }
