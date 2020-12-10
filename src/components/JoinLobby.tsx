import { FunctionComponent, useState, useContext } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import TextInput from "components/TextInput"
import { TextButton } from "styles/Components"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { setLobbyState } from "store/entities/lobby"
import { getName } from "store/entities/settings"
import { joinLobby } from "api/lobby"
import { showAlert } from "helpers"
import WebSocketContext from "api/websocket"

const ContainerAnimation = {
  hidden: { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0 },
}

const JoinLobby: FunctionComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const name = useSelector(getName)
  const [lobbyCode, setLobbyCode] = useState("")

  const ws = useContext(WebSocketContext)

  async function handleJoinLobby() {
    const { success, error, lobbyState } = await joinLobby(lobbyCode, name)
    if (success && lobbyState) {
      dispatch(setLobbyState(lobbyState))
      ws?.sendJoin({
        lobbyCode: lobbyState._id,
        user: name,
      })
      router.push(`/lobbies/${lobbyState._id}`)
    } else {
      const shownError = error ?? ""
      showAlert("danger", "Error", "Error joining lobby: " + shownError)
    }
  }

  return (
    <Container variants={ContainerAnimation} initial="hidden" animate="visible">
      <TextInput
        label="Lobby Code"
        type="text"
        placeholder="Enter lobby code here (eg. XJSIFD)"
        value={lobbyCode}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setLobbyCode(ev.target.value)
        }
      />
      <ConfirmButton
        state={lobbyCode.length == 6 ? "enabled" : "disabled"}
        onClick={handleJoinLobby}
      >
        Confirm
      </ConfirmButton>
    </Container>
  )
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

const ConfirmButton = styled(TextButton)`
  margin-top: 8px;
`

export default JoinLobby
