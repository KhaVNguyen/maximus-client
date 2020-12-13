import { FunctionComponent, useContext } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { getPlayerList, getIsHost } from "store/entities/lobby"
import { getName } from "store/entities/settings"
import XIcon from "public/x.svg"
import { kickPlayer } from "api/lobby"
import { getLobbyCode, setLobbyState } from "store/entities/lobby"
import { showAlert } from "helpers"
import { WebSocketContext } from "api/websocket"

const PlayersContainer: FunctionComponent = () => {
  const dispatch = useDispatch()
  const playerList = useSelector(getPlayerList)
  const name = useSelector(getName)
  const isHost = useSelector(getIsHost)
  const lobbyCode: string = useSelector(getLobbyCode)

  const ws = useContext(WebSocketContext)

  async function handleKickPlayer(player: string) {
    const { success, error, lobbyState } = await kickPlayer(lobbyCode, player)
    if (success && lobbyState) {
      dispatch(setLobbyState(lobbyState))
      ws?.sendKickUser({
        lobbyCode: lobbyState._id,
        user: name,
        target: player,
      })
    } else {
      const shownError = error ?? ""
      showAlert("danger", "Error", "Error kickingplayer: " + shownError)
    }
  }

  return (
    <Container layout>
      {playerList.map((player) => (
        <Player layout key={player.name}>
          {player.name}
          {isHost && player.name != name && (
            <XIcon
              onClick={() => {
                handleKickPlayer(player.name)
              }}
            />
          )}
        </Player>
      ))}
    </Container>
  )
}

const Container = styled(motion.ul)`
  list-style-type: none;
  border-radius: 5px;
  background-color: #3e3f40;
  padding: 16px;
`

const Player = styled(motion.li)`
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  height: 24px;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    transform: scale(1.5);
    margin-left: 8px;
  }
`
export default PlayersContainer
