/* 
  Holds basic styled components 
*/
import styled from "styled-components"

/*
  Typography
*/
export const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`

export const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #404040;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`

/* Variants with spacing */
export const PageTitle = styled(Title)`
  margin-bottom: 12px;
`

/*
  Interactive
*/

type ButtonStyle = "primary" | "secondary"
type ButtonState = "enabled" | "disabled"

const handleButtonBackground = (style: ButtonStyle) => {
  switch (style) {
    case "primary":
      return "#111111"
    case "secondary":
      return "#E5E5E5"
  }
}

const handleButtonTextColor = (style: ButtonStyle) => {
  switch (style) {
    case "primary":
      return "#ffffff"
    case "secondary":
      return "#111111"
  }
}

export const Button = styled.button<{
  style: ButtonStyle
}>`
  background-color: ${({ style }) => handleButtonBackground(style)};
  color: ${({ style }) => handleButtonTextColor(style)};
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  height: 48px;
  width: 100%;
  &:hover,
  &:active {
    background-color: ${({ style }) =>
      style === "primary" ? "rgba(0, 0, 0, 0.75)" : "default"};
  }
`

const handleTextButtonColor = (state: ButtonState) => {
  switch (state) {
    case "enabled":
      return "#111111"
    case "disabled":
      return "#dadada"
  }
}

export const TextButton = styled.button<{
  state: ButtonState
}>`
  color: ${({ state }) => handleTextButtonColor(state)};
  background: none;
  width: fit-content;
  padding: 8px 12px;
  align-self: flex-end;
  font-weight: bold;
  cursor: ${({ state }) => (state === "enabled" ? "pointer" : "default")};
  &:hover,
  &:active {
    color: ${({ state }) =>
      state === "enabled" ? "rgba(0, 0, 0, 0.75)" : "default"};
  }
`

export const TextInputField = styled.input`
  border: 2px solid black;
  height: 48px;
  border-radius: 4px;
  padding: 18px;
  transition: all 0.12s ease-out;
  font-size: 14px;
  &:hover,
  &:active {
    border: 2px solid rgba(0, 0, 0, 0.5);
  }
`
