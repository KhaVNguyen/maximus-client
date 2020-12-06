import { createContext } from "react"
import io from "socket.io-client"
import { useDispatch } from "react-redux"
import { Move, LobbySliceState } from "store/entities/lobby"

export interface WebSocketContextProps {
  socket: any
  sendTurn: Function
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null)

export interface ClientPayload {
  lobbyCode: string
  user: string
  move?: Move
  target?: string
}

export interface WebSocket {
  socket: SocketIOClient.Socket
  sendTurn: (payload: ClientPayload) => void
}

export function setupWebSocket() {
  const socket = io("http://localhost:5000")

  function sendTurn(payload: ClientPayload) {
    socket.emit("make-move", JSON.stringify(payload))
  }

  socket.on("get-lobby", (serverPayload: string) => {
    const payload = JSON.parse(serverPayload)
    console.log(payload)
  })

  const ws = {
    socket: socket,
    sendTurn,
  }

  return ws
}

export default WebSocketContext
