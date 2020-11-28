import styled from "styled-components"
import { Label, TextInputField } from "styles/Components"

interface TextInputProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <TextInputField {...props} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default TextInput
