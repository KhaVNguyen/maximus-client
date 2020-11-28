import { FunctionComponent } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import Layout from "styles/Layout"
import { Subtitle, PageTitle, Button } from "styles/Components"

const Lobby: FunctionComponent = () => {
  const router = useRouter()
  const code = router.query.code
  console.log(router)

  return (
    <Layout>
      <Container>
        <TextContainer>
          <PageTitle>Lobby: {code}</PageTitle>
          <Subtitle>Players In Lobby: 5</Subtitle>
        </TextContainer>
        <ButtonContainer>
          <Button style="primary">Create New Lobby</Button>
          <Button style="primary">Join Existing Lobby</Button>
        </ButtonContainer>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding: 48px 32px;
  display: grid;
  grid-row-gap: 32px;
  max-width: 992px;
  margin: auto;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default Lobby
