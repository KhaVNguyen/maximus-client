import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: "PT Serif";
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #1C1D1E;
    color: white;
    @media (min-width: 768px) {
      justify-content: center;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    vertical-align: baseline;
    font-weight: inherit;
    font-family: inherit;
    font-style: inherit;
    font-size: 100%;
    border: 0 none;
    outline: 0;
    padding: 0;
    margin: 0;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  button {
    cursor: pointer;
    transition: all 0.12s ease-out;
  }
`

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}

export default Layout
