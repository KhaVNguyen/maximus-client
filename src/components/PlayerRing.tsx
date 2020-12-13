import { FunctionComponent, useContext } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import { ActionButton, FadeIn } from "styles/Components"
import {
  getNumberOfPlayers,
  getPlayerList,
  getGameStatus,
  Move,
  Turn,
  selectMove,
  selectTarget,
} from "store/entities/lobby"
import { getName } from "store/entities/settings"
import { WebSocketContext } from "api/websocket"

const PlayerRing: FunctionComponent = () => {
  const dispatch = useDispatch()
  const playerName = useSelector(getName)
  const playerList = useSelector(getPlayerList)
  const numberOfPlayers = useSelector(getNumberOfPlayers)
  const gameStatus = useSelector(getGameStatus)

  const ws = useContext(WebSocketContext)

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
  }

  function onSelectTarget(target: string) {
    dispatch(selectTarget({ player: playerName, target, ws }))
  }

  function getTargetDisplayText() {
    const player = playerList.find((player) => player.name == playerName)
    if (player && player.turn) {
      const move = player.turn.move
      if (move) {
        const capitalMove = move.charAt(0).toUpperCase() + move.slice(1)
        return `${capitalMove} who?`
      }
    }
    return ""
  }

  const isSelectingMove =
    gameStatus == "waiting-for-turns" &&
    playerList?.find((p) => p.name == playerName)?.turn == null

  const isSelectingTarget =
    gameStatus == "waiting-for-turns" &&
    playerList?.find((p) => p.name == playerName)?.turn?.target == null

  const chosenMoveAndTarget =
    gameStatus == "waiting-for-turns" &&
    playerList?.find((p) => p.name == playerName)?.turn?.move != null &&
    playerList?.find((p) => p.name == playerName)?.turn?.target != null

  const playerShield = playerList?.find((p) => p.name == playerName)?.shield
  const canShield = playerShield != null && playerShield > 0

  const gameWinner = playerList?.find((p) => p.health > 0)

  return (
    <Container>
      <Ring className={getRingType(numberOfPlayers)}>
        {playerList.map((player) => (
          <Player
            key={player.name}
            layout
            selectable={isSelectingTarget}
            isYourPlayer={player.name === playerName}
            onClick={() => {
              if (isSelectingTarget) {
                onSelectTarget(player.name)
              }
            }}
          >
            <PlayerName>{player.name}</PlayerName>
            <PlayerStats>
              <Shield>{player.shield}</Shield>
              <Divider>|</Divider>
              <Health>{player.health}</Health>
            </PlayerStats>
            {/* <TurnStatusMessage>-10</TurnStatusMessage> */}
            {player?.turn?.move && (
              <PlayerMove color={getMoveDisplayColor(player.turn.move)}>
                {getMoveDisplayText(player.turn)}
              </PlayerMove>
            )}
          </Player>
        ))}
      </Ring>
      <AnimatePresence>
        {isSelectingMove && (
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
              {canShield && (
                <ActionButton
                  variant="shield"
                  onClick={() => {
                    onSelectMove("shield")
                  }}
                >
                  Shield
                </ActionButton>
              )}
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
        {isSelectingTarget && (
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
        {gameStatus == "waiting-for-turns" && chosenMoveAndTarget && (
          <PromptContainer
            variants={FadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Prompt>Waiting...</Prompt>
          </PromptContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {gameStatus == "showing-result" && (
          <PromptContainer
            variants={FadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Prompt>Results</Prompt>
          </PromptContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {gameStatus == "game-over" && (
          <PromptContainer
            variants={FadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <GameOverPrompt>Game Over</GameOverPrompt>
            <Prompt>{gameWinner?.name} Won</Prompt>
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

const Player = styled(motion.li)<{
  selectable: boolean
  isYourPlayer: boolean
}>`
  background: #494a4b;

  border: ${(props) => (props.isYourPlayer ? "2px solid white" : "none")};
  border-radius: 6px;
  cursor: ${(props) => (props.selectable ? "pointer" : "default")};
  transition: all 0.12s ease-out;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    filter: ${(props) => (props.selectable ? "brightness(125%)" : "none")};
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
  color: white;
  margin-bottom: 4px;
`

const PlayerStats = styled.div`
  display: flex;
`

const Shield = styled(TextStat)`
  color: #6f9cc1;
  margin-right: 4px;
`

const Divider = styled(TextStat)`
  color: rgba(255, 255, 255, 0.8);
`

const Health = styled(TextStat)`
  color: #f46a69;
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
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
`

const PromptContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
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

const GameOverPrompt = styled(Prompt)`
  color: #b11213;
  margin-bottom: 12px;
`

// const TurnStatusMessage = styled.div`
//   position: absolute;
//   top: -32px;
//   color: white;
// `

export default PlayerRing
