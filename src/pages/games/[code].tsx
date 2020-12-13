import { FunctionComponent, useState, useContext } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { motion, AnimateSharedLayout } from "framer-motion"
import Layout from "styles/Layout"
import { Subtitle, PageTitle, ContainerAnimation } from "styles/Components"
import { getNumberOfPlayers } from "store/entities/lobby"
import { getName } from "store/entities/settings"
import PlayerRing from "components/PlayerRing"
import Modal from "components/Modal"
import { LeavePayload, WebSocketContext } from "api/websocket"

const Lobby: FunctionComponent = () => {
  const ws = useContext(WebSocketContext)
  const router = useRouter()
  const code = router.query.code
  const numberOfPlayers = useSelector(getNumberOfPlayers)
  const name = useSelector(getName)
  const [modalOpen, setModalOpen] = useState(false)

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
                {/* <ShieldLabel>Shield</ShieldLabel>
                <Divider>|</Divider>
                <HealthLabel>Health</HealthLabel> */}
                <SubtleButton
                  onClick={() => {
                    setModalOpen(true)
                  }}
                >
                  How To Play
                </SubtleButton>
              </Legend>
              <SubtleButton
                onClick={() => {
                  if (typeof code == "string") {
                    const leavePayload: LeavePayload = {
                      lobbyCode: code,
                      user: name,
                    }
                    ws?.sendLeave(leavePayload)
                  }
                  router.push("/")
                }}
              >
                Exit Game
              </SubtleButton>
            </RightContainer>
          </TopContainer>
          <PlayerRing />
        </Container>
        <Modal isOpen={modalOpen} setOpen={setModalOpen} />
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

const SubtleButton = styled.button`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  /* padding: 8px 24px; */
  width: 128px;
  height: 36px;
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
