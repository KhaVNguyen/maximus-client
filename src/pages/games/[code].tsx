import { FunctionComponent } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { motion, AnimateSharedLayout } from "framer-motion"
import Layout from "styles/Layout"
import { Subtitle, PageTitle, ContainerAnimation } from "styles/Components"
import { getNumberOfPlayers, setLobbyState } from "store/entities/lobby"
import PlayerRing from "components/PlayerRing"

const Lobby: FunctionComponent = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const code = router.query.code
  const numberOfPlayers = useSelector(getNumberOfPlayers)

  return (
    <Layout>
      <AnimateSharedLayout>
        <Container
          layout
          variants={ContainerAnimation}
          initial="hidden"
          animate="visible"
        >
          <TopContainer>
            <TextContainer layout>
              <PageTitle>Your Turn</PageTitle>
              <Subtitle>Players: {numberOfPlayers}</Subtitle>
            </TextContainer>
            <RightContainer>
              <Legend>
                <ShieldLabel>Shield</ShieldLabel>
                <Divider>|</Divider>
                <HealthLabel>Health</HealthLabel>
              </Legend>
              <ExitButton
                onClick={() => {
                  router.push("/")
                }}
              >
                Exit Game
              </ExitButton>
            </RightContainer>
          </TopContainer>
          <PlayerRing />
        </Container>
      </AnimateSharedLayout>
    </Layout>
  )
}

const Container = styled(motion.div)`
  padding: 48px 32px;
  display: grid;
  grid-row-gap: 32px;
  max-width: 625px;
  margin: auto;
`

const TextContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

const TopContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ExitButton = styled.button`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 24px;
  margin-top: 12px;
  border-radius: 4px;
  color: #b4b5b4;
  transition: all 0.12s ease-out;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const Legend = styled.div`
  display: flex;
`

const Label = styled.p`
  font-weight: bold;
`

const ShieldLabel = styled(Label)`
  color: #6f9cc1;
  margin-right: 4px;
`

const Divider = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
`

const HealthLabel = styled(Label)`
  color: #f46a69;
  margin-left: 4px;
`

export default Lobby
