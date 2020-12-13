import axios from "axios"
import { LobbySliceState } from "store/entities/lobby"

interface CreateNewLobbyResponse {
  success: boolean
  error?: string
  lobbyState?: LobbySliceState
}

export async function createNewLobby(
  name: string
): Promise<CreateNewLobbyResponse> {
  try {
    const response = await axios.post("http://localhost:5000/v1/lobbies/", {
      name,
    })

    return {
      success: true,
      lobbyState: response.data,
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

interface JoinLobbyResponse {
  success: boolean
  error?: string
  lobbyState?: LobbySliceState
}

export async function joinLobby(
  lobbyCode: string,
  name: string
): Promise<JoinLobbyResponse> {
  try {
    const response = await axios.post(
      `http://localhost:5000/v1/lobbies/${lobbyCode}`,
      {
        name,
      }
    )
    return {
      success: true,
      lobbyState: response.data,
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

interface KickPlayerResponse {
  success: boolean
  error?: string
  lobbyState?: LobbySliceState
}

export async function kickPlayer(
  lobbyCode: string,
  name: string
): Promise<KickPlayerResponse> {
  try {
    const response = await axios.patch(
      `http://localhost:5000/v1/lobbies/${lobbyCode}`,
      {
        name,
      }
    )
    return {
      success: true,
      lobbyState: response.data,
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
