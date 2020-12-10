import { createContext } from "react"
import io from "socket.io-client"
import { Move } from "store/entities/lobby"

export interface WebSocketContextProps {
  socket: SocketIOClient.Socket
  sendTurn: (payload: TurnPayload) => void
  sendJoin: (payload: JoinPayload) => void
  sendLeave: (payload: LeavePayload) => void
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null)

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

export function setupWebSocket() {
  const socket = io("http://localhost:5000")

  function sendTurn(payload: TurnPayload) {
    socket.emit("make-move", JSON.stringify(payload))
  }

  function sendJoin(payload: JoinPayload) {
    socket.emit("join", JSON.stringify(payload))
  }

  function sendLeave(payload: LeavePayload) {
    socket.emit("leave", JSON.stringify(payload))
  }

  socket.on("get-lobby", (serverPayload: string) => {
    const payload = JSON.parse(serverPayload)
    console.log(payload)
  })

  const ws = {
    socket: socket,
    sendTurn,
    sendJoin,
    sendLeave,
  }

  return ws
}

export default WebSocketContext
