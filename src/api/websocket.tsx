import { createContext, useState, useEffect } from "react"
import io from "socket.io-client"
import { API_BASE } from "config"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { setLobbyState, Move } from "store/entities/lobby"

/* Payload Types */
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

export type GameStatus =
  | "waiting-in-lobby"
  | "waiting-for-turns"
  | "showing-result"
  | "game-over"

export interface WebSocketContextProps {
  socket: SocketIOClient.Socket | null
  sendTurn: (payload: TurnPayload) => void
  sendJoin: (payload: JoinPayload) => void
  sendLeave: (payload: LeavePayload) => void
  sendStartGame: (payload: StartGamePayload) => void
  sendKickUser: (payload: KickUserPayload) => void
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null)

type WebSocketProps = React.PropsWithChildren<{}>
const WebSocketWrapper = ({ children }: WebSocketProps) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const socket = io(API_BASE)
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

    socket.on("kicked", () => {
      console.log("We got kicked...")
      router.push("/")
    })

    socket.on("game-started", (serverPayload: string) => {
      const payload = JSON.parse(serverPayload)
      dispatch(setLobbyState(payload))
      router.push(`/games/${payload._id}`)
    })

    socket.on("game-status-changed", async (serverPayload: string) => {
      const payload = JSON.parse(serverPayload)

      const { status } = payload // the status of the game
      switch (status) {
        case "waiting-for-turns":
          console.log("Currently waiting for player turns to be made..")
          dispatch(setLobbyState(payload))
          break
        case "showing-result":
          console.log("Turns done and computed. Showing results now")
          console.log(payload)
          dispatch(setLobbyState(payload))
          break
        case "game-over":
          console.log("Somebody won the entire game. Game over.")
          dispatch(setLobbyState(payload))
          break
        case "waiting-in-lobby":
          console.log("Going back to the lobby...")
          router.push(`/lobbies/${payload._id}`)
          dispatch(setLobbyState(payload))
          break
      }
    })

    setSocket(socket)
  }, [])

  function sendTurn(payload: TurnPayload) {
    socket?.emit("make-move", JSON.stringify(payload))
  }

  function sendJoin(payload: JoinPayload) {
    console.log("gonna send join to: ", socket?.id)
    socket?.emit("join", JSON.stringify(payload))
  }

  function sendLeave(payload: LeavePayload) {
    socket?.emit("leave", JSON.stringify(payload))
  }

  function sendStartGame(payload: StartGamePayload) {
    socket?.emit("start-game", JSON.stringify(payload))
  }

  function sendKickUser(payload: KickUserPayload) {
    socket?.emit("kick-user", JSON.stringify(payload))
  }

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        sendTurn,
        sendJoin,
        sendLeave,
        sendStartGame,
        sendKickUser,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export { WebSocketContext }

export default WebSocketWrapper
