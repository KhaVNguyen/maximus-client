import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { AnimateSharedLayout, motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import Layout from "styles/Layout"
import { Subtitle, Title, Button, ContainerAnimation } from "styles/Components"
import TextInput from "components/TextInput"
import JoinLobby from "components/JoinLobby"
import { getName, setName } from "store/entities/settings"

const Home: FunctionComponent = () => {
  type State = "default" | "enter-lobby-code"
  const [currentState, setCurrentState] = useState<State>("default")

  const dispatch = useDispatch()
  const name = useSelector(getName)

  return (
    <AnimateSharedLayout>
      <Layout>
        <Container
          layout
          variants={ContainerAnimation}
          initial="hidden"
          animate="visible"
        >
          <TextContainer layout>
            <HomeTitle>Maximus</HomeTitle>
            <Subtitle>
              Multiplayer strategy game of <Emphasized>survival</Emphasized>
            </Subtitle>
          </TextContainer>
          <TextInput
            label="Name"
            type="text"
            placeholder="Enter display name here"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
          <ButtonContainer layout>
            <Button variant="primary">Create New Lobby</Button>
            <Button
              variant="primary"
              onClick={() => {
                setCurrentState("enter-lobby-code")
              }}
            >
              Join Existing Lobby
            </Button>
          </ButtonContainer>
          {currentState == "enter-lobby-code" && <JoinLobby />}
        </Container>
      </Layout>
    </AnimateSharedLayout>
  )
}

const Container = styled(motion.div)`
  padding: 48px 32px;
  display: grid;
  grid-row-gap: 32px;
  max-width: 500px;
  margin: auto;
`

const TextContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

const HomeTitle = styled(Title)`
  margin-bottom: 12px;
`

const Emphasized = styled.span`
  color: #b21212;
`

const ButtonContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default Home
