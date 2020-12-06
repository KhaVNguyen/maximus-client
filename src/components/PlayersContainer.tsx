import { FunctionComponent } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { getPlayerList, removePlayer, getIsHost } from "store/entities/lobby"
import XIcon from "public/x.svg"

const PlayersContainer: FunctionComponent = () => {
  const dispatch = useDispatch()
  const playerList = useSelector(getPlayerList)
  const isHost = useSelector(getIsHost)

  return (
    <Container layout>
      {playerList.map((player) => (
        <Player layout key={player.name}>
          {isHost && (
            <XIcon
              onClick={() => {
                dispatch(removePlayer(player.name))
              }}
            />
          )}
          {player.name}
        </Player>
      ))}
    </Container>
  )
}

const Container = styled(motion.ul)`
  list-style-type: none;
  border-radius: 5px;
  background-color: #3e3f40;
  padding: 16px;
`

const Player = styled(motion.li)`
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  height: 24px;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    transform: scale(1.5);
    margin-right: 12px;
  }
`
export default PlayersContainer
