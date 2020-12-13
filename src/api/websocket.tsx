import { createContext } from "react"
import io from "socket.io-client"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { Move, setLobbyState } from "store/entities/lobby"
import { API_BASE } from "config"

export interface WebSocketContextProps {
  socket: SocketIOClient.Socket
  sendTurn: (payload: TurnPayload) => void
  sendJoin: (payload: JoinPayload) => void
  sendLeave: (payload: LeavePayload) => void
  sendStartGame: (payload: StartGamePayload) => void
  sendKickUser: (payload: KickUserPayload) => void
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null)

export { WebSocketContext }

export interface TurnPayload {
  lobbyCode: string
  user: string
  move?: Move
  target?: string
}

export interface JoinPayload {
  lobbyCode: string
  user: string
}

export interface LeavePayload {
  lobbyCode: string
  user: string
}

export interface StartGamePayload {
  lobbyCode: string
  user: string
}

export interface KickUserPayload {
  lobbyCode: string
  user: string
  target: string
}

export type GameStatus = "waiting-for-turns" | "showing-result" | "game-over"

type WebSocketProps = React.PropsWithChildren<{}>

export default function WebSocket({ children }: WebSocketProps) {
  const dispatch = useDispatch()
  const socket = io(API_BASE)
  const router = useRouter()

  function sendTurn(payload: TurnPayload) {
    socket.emit("make-move", JSON.stringify(payload))
  }

  function sendJoin(payload: JoinPayload) {
    socket.emit("join", JSON.stringify(payload))
  }

  function sendLeave(payload: LeavePayload) {
    socket.emit("leave", JSON.stringify(payload))
  }

  function sendStartGame(payload: StartGamePayload) {
    socket.emit("start-game", JSON.stringify(payload))
  }

  function sendKickUser(payload: KickUserPayload) {
    socket.emit("kick-user", JSON.stringify(payload))
  }

  socket.on("get-lobby", (serverPayload: string) => {
    const payload = JSON.parse(serverPayload)
    console.log(payload)
  })

  socket.on("user-joined", (serverPayload: string) => {
    const payload = JSON.parse(serverPayload)
    dispatch(setLobbyState(payload))

    console.log("UserJoined: ", payload)
  })

  socket.on("user-left", (serverPayload: string) => {
    const payload = JSON.parse(serverPayload)
    dispatch(setLobbyState(payload))

    console.log("User Left: ", payload)
  })

  socket.on("kicked", (serverPayload: string) => {
    console.log("We got kicked...")
    router.push("/")
  })

  socket.on("game-started", (serverPayload: string) => {
    const payload = JSON.parse(serverPayload)
    dispatch(setLobbyState(payload))
    router.push(`/games/${payload._id}`)
  })

  socket.on("game-status-changed", (serverPayload: string) => {
    const payload = JSON.parse(serverPayload)

    dispatch(setLobbyState(payload))

    const { status } = payload // the status of the game
    switch (status) {
      case "waiting-for-turns":
        console.log("Currently waiting for player turns to be made..")
        break
      case "showing-result":
        console.log("Turns done and computed. Showing results now")
        break
      case "game-over":
        console.log("Somebody won the entire game. Game over.")
        break
    }
  })

  const ws = {
    socket: socket,
    sendTurn,
    sendJoin,
    sendLeave,
    sendStartGame,
    sendKickUser,
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  )
}
