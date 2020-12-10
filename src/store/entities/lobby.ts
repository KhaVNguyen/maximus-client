import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { TurnPayload, WebSocketContextProps } from "api/websocket"
import { RootState } from "store/reducer"

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

interface PlayerState {
  name: string
  health: number
  shield: number
  isCharged: boolean
  turn: Turn
  results: Result
}

export interface LobbySliceState {
  _id: string
  players: PlayerState[]
}

const initialState: LobbySliceState = {
  _id: "",
  players: [],
}

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setLobbyState: (lobby, action: PayloadAction<LobbySliceState>) => {
      lobby._id = action.payload._id
      lobby.players = action.payload.players
    },
    removePlayer: (lobby, action: PayloadAction<string>) => {
      lobby.players = lobby.players.filter(
        (player) => player.name != action.payload
      )
    },
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
          console.log("We're gonna send to the server this payload: ", payload)
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

export const {
  setLobbyState,
  removePlayer,
  selectMove,
  selectTarget,
} = lobbySlice.actions
export default lobbySlice.reducer
