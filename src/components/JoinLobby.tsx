import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import TextInput from "components/TextInput"
import { TextButton } from "styles/Components"
import { useRouter } from "next/router"

const ContainerAnimation = {
  hidden: { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0 },
}

const JoinLobby: FunctionComponent = () => {
  const router = useRouter()
  const [lobbyCode, setLobbyCode] = useState("")

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
        onClick={(e) => {
          e.preventDefault()
          router.push(`lobbies/${lobbyCode}`)
        }}
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
