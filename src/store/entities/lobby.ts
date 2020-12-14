import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TurnPayload, WebSocketContextProps } from "api/websocket"
import { RootState } from "store/reducer"
import { GameStatus } from "api/websocket"

export type Move = "attack" | "shield" | "charge"

export interface Turn {
  move?: Move
  target?: string
}

export interface Result {
  healthDamageTaken: number
  shieldDamageTaken: number
  damageDealt: number
}

export interface PlayerState {
  name: string
  health: number
  damageTaken: number
  damageDealt: number
  isCharged: boolean
  turn: Turn
  results: Result
}

export interface LobbySliceState {
  _id: string
  status: GameStatus
  players: PlayerState[]
}

const initialState: LobbySliceState = {
  _id: "",
  status: "waiting-for-turns",
  players: [],
}

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setLobbyState: (lobby, action: PayloadAction<LobbySliceState>) => {
      lobby._id = action.payload._id
      lobby.players = action.payload.players
      lobby.status = action.payload.status
    },
    // removePlayer: (
    //   lobby,
    //   action: PayloadAction<{
    //     host: string
    //     target: string
    //     ws: WebSocketContextProps | null
    //   }>
    // ) => {
    //   lobby.players = lobby.players.filter(
    //     (player) => player.name != action.payload.target
    //   )
    // },
    selectMove: (
      lobby,
      action: PayloadAction<{ player: string; move: Move }>
    ) => {
      const currentPlayer = lobby.players.find(
        (player) => player.name == action.payload.player
      )
      if (currentPlayer) {
        currentPlayer.turn = {}
        currentPlayer.turn.move = action.payload.move
      }
    },
    selectTarget: (
      lobby,
      action: PayloadAction<{
        player: string
        target: string
        ws: WebSocketContextProps | null
      }>
    ) => {
      const { player, target, ws } = action.payload
      const currentPlayer = lobby.players.find((p) => p.name == player)
      if (currentPlayer) {
        currentPlayer.turn.target = target
        try {
          const payload: TurnPayload = {
            lobbyCode: lobby._id,
            user: currentPlayer.name,
            move: currentPlayer.turn.move,
            target: currentPlayer.turn.target,
          }
          ws?.sendTurn(payload)
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
})

export const getPlayerList = (state: RootState): PlayerState[] =>
  state.entities.lobby.players

export const getNumberOfPlayers = (state: RootState): number =>
  state.entities.lobby.players.length

export const getIsHost = (state: RootState): boolean =>
  state.entities.settings.name == state.entities.lobby.players[0]?.name

export const getCanStartGame = (state: RootState): boolean =>
  state.entities.lobby.players.length >= 2

export const getGameStatus = (state: RootState): GameStatus =>
  state.entities.lobby.status

export const getLobbyCode = (state: RootState): string =>
  state.entities.lobby._id

export const { setLobbyState, selectMove, selectTarget } = lobbySlice.actions
export default lobbySlice.reducer
