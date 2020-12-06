import { useEffect, FunctionComponent } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { motion, AnimateSharedLayout } from "framer-motion"
import Layout from "styles/Layout"
import {
  Subtitle,
  PageTitle,
  Button,
  ContainerAnimation,
} from "styles/Components"
import {
  getNumberOfPlayers,
  getIsHost,
  getCanStartGame,
} from "store/entities/lobby"
import PlayersContainer from "components/PlayersContainer"

const Lobby: FunctionComponent = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const code = router.query.code

  const numberOfPlayers = useSelector(getNumberOfPlayers)
  const isHost = useSelector(getIsHost)
  const canStartGame = useSelector(getCanStartGame)

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
