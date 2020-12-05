import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import { ActionButton, FadeIn } from "styles/Components"
import {
  getNumberOfPlayers,
  getPlayerList,
  setLobbyState,
  Move,
  Turn,
  selectMove,
  selectTarget,
} from "store/entities/lobby"
import { getName } from "store/entities/settings"

type CurrentStatus =
  | "choosing-move"
  | "choosing-target"
  | "viewing-result"
  | "spectating"

const PlayerRing: FunctionComponent = () => {
  const dispatch = useDispatch()
  const playerName = useSelector(getName)
  const playerList = useSelector(getPlayerList)
  const numberOfPlayers = useSelector(getNumberOfPlayers)

  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>(
    "choosing-move"
  )

  function getRingType(count: number): string {
    return `ring ring-${count}`
  }

  function getMoveDisplayColor(move?: Move) {
    if (!move) {
      return "white"
    }
    switch (move) {
      case "attack":
        return "#D54645"
      case "shield":
        return "#324E68"
      case "charge":
        return "#333333"
    }
  }

  function getMoveDisplayText(turn: Turn) {
    const target = turn.target ? `: ${turn.target}` : ""
    return `${turn.move}${target}`
  }

  function onSelectMove(move: Move) {
    dispatch(selectMove({ player: playerName, move }))
    setCurrentStatus("choosing-target")
  }

  function onSelectTarget(target: string) {
    dispatch(selectTarget({ player: playerName, target }))
    setCurrentStatus("viewing-result")
  }

  function getTargetDisplayText() {
    const player = playerList.find((player) => player.name == playerName)
    console.log(player)
    if (player) {
      const move = player.turn.move
      console.log(move)
      if (move) {
        const capitalMove = move.charAt(0).toUpperCase() + move.slice(1)
        console.log(capitalMove)
        return `${capitalMove} who?`
      }
    }
    return "Something went wrong.."
  }

  return (
    <Container>
      <Ring className={getRingType(numberOfPlayers)}>
        {playerList.map((player) => (
          <Player
            key={player.name}
            layout
            selectable={currentStatus == "choosing-target"}
            onClick={() => {
              if (currentStatus == "choosing-target") {
                onSelectTarget(player.name)
              }
            }}
          >
            <PlayerName>{player.name}</PlayerName>
            <PlayerStats>
              <Shield>{player.health}</Shield>
              <Divider>|</Divider>
              <Health>{player.shield}</Health>
            </PlayerStats>
            {player.turn.move && (
              <PlayerMove color={getMoveDisplayColor(player.turn.move)}>
                {getMoveDisplayText(player.turn)}
              </PlayerMove>
            )}
          </Player>
        ))}
      </Ring>
      <AnimatePresence>
        {currentStatus == "choosing-move" && (
          <Actions
            variants={FadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ActionsRow>
              <ActionButton
                variant="attack"
                onClick={() => {
                  onSelectMove("attack")
                }}
              >
                Attack
              </ActionButton>
              <ActionButton
                variant="shield"
                onClick={() => {
                  onSelectMove("shield")
                }}
              >
                Shield
              </ActionButton>
              <ActionButton
                variant="charge"
                onClick={() => {
                  onSelectMove("charge")
                }}
              >
                Charge
              </ActionButton>
            </ActionsRow>
          </Actions>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentStatus == "choosing-target" && (
          <PromptContainer
            variants={FadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Prompt>{getTargetDisplayText()}</Prompt>
          </PromptContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentStatus == "viewing-result" && (
          <PromptContainer
            variants={FadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Prompt>Here&apos;s What Happened..</Prompt>
          </PromptContainer>
        )}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
const Ring = styled.ul``

const Player = styled(motion.li)<{ selectable: boolean }>`
  background: white;
  border-radius: 8px;
  cursor: ${(props) => (props.selectable ? "pointer" : "none")};
  transition: all 0.12s ease-out;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    filter: brightness(125%);
  }
`

const TextStat = styled.p`
  font-size: 14px;
  font-weight: bold;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`

const PlayerName = styled(TextStat)`
  color: #4d4d4d;
  margin-bottom: 4px;
`

const PlayerStats = styled.div`
  display: flex;
`

const Shield = styled(TextStat)`
  color: #324e68;
  margin-right: 4px;
`

const Divider = styled(TextStat)`
  color: #595959;
`

const Health = styled(TextStat)`
  color: #d54645;
  margin-left: 4px;
`

const PlayerMove = styled(TextStat)<{ color: string }>`
  font-size: 12px;
  position: absolute;
  top: calc(100% + 4px);
  color: white;
  background: ${(props) => props.color};
  padding: 6px 12px;
  width: 100%;
  display: block;
  text-align: center;
  border-radius: 4px;
  &:first-letter {
    text-transform: capitalize;
  }
`

const Actions = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ActionsRow = styled.div`
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
`

const PromptContainer = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: -1;
`
const Prompt = styled.p`
  font-size: 20px;
  font-weight: bold;
`

export default PlayerRing
