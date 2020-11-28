import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import TextInput from "components/TextInput"
import { TextButton } from "styles/Components"

const JoinLobby: FunctionComponent = () => {
  const [lobbyCode, setLobbyCode] = useState("")

  return (
    <Container>
      <TextInput
        label="Lobby Code"
        type="text"
        placeholder="Enter lobby code here (eg. XJSIFD)"
        value={lobbyCode}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setLobbyCode(ev.target.value)
        }
      />
      <ConfirmButton state={lobbyCode.length == 6 ? "enabled" : "disabled"}>
        Confirm
      </ConfirmButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ConfirmButton = styled(TextButton)`
  margin-top: 8px;
`

export default JoinLobby
