import axios from "axios"
import { LobbySliceState } from "store/entities/lobby"
import { API_BASE } from "config"

interface CreateNewLobbyResponse {
  success: boolean
  error?: string
  lobbyState?: LobbySliceState
}

export async function createNewLobby(
  name: string
): Promise<CreateNewLobbyResponse> {
  try {
    const response = await axios.post(`${API_BASE}/v1/lobbies/`, {
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
    const response = await axios.post(`${API_BASE}/v1/lobbies/${lobbyCode}`, {
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
