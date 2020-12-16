import styled from "styled-components"
import { motion } from "framer-motion"
import { Label, TextInputField } from "styles/Components"

interface TextInputProps {
  label: string
  type: string
  placeholder: string
  value: string
  capitalize?: boolean
  maxLength?: number
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <Container layout>
      <Label>{props.label}</Label>
      <TextInputField
        {...props}
        capitalize={props.capitalize ?? false}
        maxLength={props.maxLength}
      />
    </Container>
  )
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

export default TextInput
