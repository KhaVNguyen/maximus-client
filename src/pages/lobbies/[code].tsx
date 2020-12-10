import { FunctionComponent, useContext } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { motion, AnimateSharedLayout } from "framer-motion"
import Layout from "styles/Layout"
import {
  Subtitle,
  PageTitle,
  Button,
  ContainerAnimation,
} from "styles/Components"
import { getName } from "store/entities/settings"
import {
  getNumberOfPlayers,
  getIsHost,
  getCanStartGame,
} from "store/entities/lobby"
import PlayersContainer from "components/PlayersContainer"
import WebSocketContext, { LeavePayload } from "api/websocket"

const Lobby: FunctionComponent = () => {
  const router = useRouter()
  const code = router.query.code

  const name = useSelector(getName)
  const numberOfPlayers = useSelector(getNumberOfPlayers)
  const isHost = useSelector(getIsHost)
  const canStartGame = useSelector(getCanStartGame)

  const ws = useContext(WebSocketContext)

  return (
    <Layout>
      <AnimateSharedLayout>
        <Container
          layout
          variants={ContainerAnimation}
          initial="hidden"
          animate="visible"
        >
          <TextContainer layout>
            <PageTitle>Lobby: {code}</PageTitle>
            <Subtitle>Players In Lobby: {numberOfPlayers}</Subtitle>
          </TextContainer>
          <PlayersContainer />
          <ButtonContainer layout>
            {isHost && canStartGame && (
              <Button
                variant="primary"
                onClick={() => {
                  router.push(`/games/${code}`)
                }}
              >
                Start Game
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                if (typeof code == "string") {
                  const leavePayload: LeavePayload = {
                    lobbyCode: code,
                    user: name,
                  }
                  console.log(leavePayload)
                  ws?.sendLeave(leavePayload)
                }
                router.push("/")
              }}
            >
              Leave Lobby
            </Button>
          </ButtonContainer>
        </Container>
      </AnimateSharedLayout>
    </Layout>
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

const ButtonContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default Lobby
