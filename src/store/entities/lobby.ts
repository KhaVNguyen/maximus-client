import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store/reducer"

export type Move = "attack" | "shield" | "charge"

export interface Turn {
  move?: Move
  target?: string
}

interface PlayerState {
  name: string
  health: number
  shield: number
  isCharged: boolean
  turn: Turn
}

interface LobbySliceState {
  code: string
  players: PlayerState[]
}

const initialState: LobbySliceState = {
  code: "",
  players: [],
}

// Testing only, delete after
const DUMMY_LOBBY_STATE: LobbySliceState = {
  code: "DFSDFS",
  players: [
    {
      name: "JoeMama",
      health: 100,
      shield: 100,
      isCharged: false,
      turn: {
        // move: "attack",
        // target: "Res",
      },
    },
    {
      name: "Res",
      health: 30,
      shield: 10,
      isCharged: true,
      turn: {
        // move: "shield",
        // target: "Res",
      },
    },
    {
      name: "Joe",
      health: 5,
      shield: 0,
      isCharged: false,
      turn: {
        // move: "charge",
        // target: "Res",
      },
    },
    {
      name: "Margo",
      health: 32,
      shield: 5,
      isCharged: false,
      turn: {
        // move: "charge",
        // target: "Margo",
      },
    },
    {
      name: "Compilation",
      health: 32,
      shield: 5,
      isCharged: false,
      turn: {
        // move: "attack",
        // target: "Joe",
      },
    },
    {
      name: "RedRum",
      health: 32,
      shield: 5,
      isCharged: false,
      turn: {
        // move: "shield",
        // target: "Res",
      },
    },
    {
      name: "Market",
      health: 32,
      shield: 5,
      isCharged: false,
      turn: {
        // move: "attack",
        // target: "Res",
      },
    },
    {
      name: "X",
      health: 32,
      shield: 5,
      isCharged: false,
      turn: {
        // move: "attack",
        // target: "Margo",
      },
    },
  ],
}

const lobbySlice = createSlice({
  name: "lobby",
  // initialState,
  initialState: DUMMY_LOBBY_STATE,
  reducers: {
    setLobbyState: (lobby, action: PayloadAction<LobbySliceState>) => {
      lobby.code = action.payload.code
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
        currentPlayer.turn.move = action.payload.move
      }
    },
    selectTarget: (
      lobby,
      action: PayloadAction<{ player: string; target: string }>
    ) => {
      const currentPlayer = lobby.players.find(
        (player) => player.name == action.payload.player
      )
      if (currentPlayer) {
        currentPlayer.turn.target = action.payload.target
      }
    },
    // doTurn: (lobby, action: PayloadAction<Turn>) => {

    // }
  },
})

export const getPlayerList = (state: RootState): PlayerState[] =>
  state.entities.lobby.players

export const getNumberOfPlayers = (state: RootState): number =>
  state.entities.lobby.players.length

export const {
  setLobbyState,
  removePlayer,
  selectMove,
  selectTarget,
} = lobbySlice.actions
export default lobbySlice.reducer
