import Modal from "react-modal"
import styled from "styled-components"
import { Subtitle } from "styles/Components"
import XIcon from "public/x.svg"

interface ModalProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  afterOpenModal?: () => void
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "650px",
    backgroundColor: "#2B2C2D",
  },
}

const AppModal: React.FC<ModalProps> = ({
  isOpen,
  setOpen,
  afterOpenModal,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={() => {
        setOpen(false)
      }}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={128}
      ariaHideApp={false}
    >
      <ModalContent>
        <Subtitle>How To Play</Subtitle>
        <CloseButton
          onClick={() => {
            setOpen(false)
          }}
        >
          <XIcon />
        </CloseButton>
        <Instructions>
          <Instruction>
            <Bold>Goal</Bold>: Be the last one standing
          </Instruction>
          <Instruction>
            Every player starts with 100 <Health>Health</Health>
          </Instruction>
          <Instruction>
            You can choose to either <Health>Attack</Health>,{" "}
            <Shield>Shield</Shield>, or <Charge>Charge</Charge> yourself or
            another player
          </Instruction>
          <Instruction>
            All player turns are executed at the <Bold>same time</Bold>
          </Instruction>
          <Instruction>
            <Health>Attacking</Health> a player deals randomly between 5 - 10
            damage
          </Instruction>
          <Instruction>
            If you receive the <Shield>Shield</Shield> action, you will take
            half of the total damage of all incoming <Health>Attacks</Health>{" "}
            that round
          </Instruction>
          <Instruction>
            <Charge>Charging </Charge> yourself allows you to do double damage
            on the next round
          </Instruction>
        </Instructions>
      </ModalContent>
    </Modal>
  )
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Instructions = styled.ul`
  list-style: none;
  margin-top: 16px;
`

const Instruction = styled.li`
  color: rgba(255, 255, 255, 0.8);
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`

const Bold = styled.span`
  font-weight: bold;
`

const Health = styled.span`
  color: #f46a69;
  font-weight: bold;
`
const Shield = styled.span`
  color: #6f9cc1;
  font-weight: bold;
`

const Charge = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
`

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  transform: scale(1.5);
  cursor: pointer;
`

export default AppModal
