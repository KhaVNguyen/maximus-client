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
  color: rgba(255, 255, 255, 0.75);
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`

export const Body = styled.p`
  font-size: 14px;
  font-weight: bold;
`

/* Variants with spacing */
export const PageTitle = styled(Title)`
  margin-bottom: 12px;
`

/*
  Interactive
*/

type ButtonVariant = "primary" | "secondary"
type ButtonState = "enabled" | "disabled"
type ActionButtonVariant = "attack" | "shield" | "charge"

const handleButtonBackground = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "#E5E5E5"
    case "secondary":
      return "#111111"
  }
}

const handleButtonTextColor = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "#111111"
    case "secondary":
      return "#ffffff"
  }
}

export const Button = styled.button<{
  variant: ButtonVariant
}>`
  background-color: ${({ variant }) => handleButtonBackground(variant)};
  color: ${({ variant }) => handleButtonTextColor(variant)};
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  height: 48px;
  width: 100%;
  transition: all 0.12s ease-out;
  &:hover,
  &:active {
    background-color: ${({ variant }) =>
      variant === "primary" ? "#BEBEBE" : "#262626"};
    filter: ${({ variant }) =>
      variant === "primary" ? "none" : "brightness(90%)"};
  }
`

const handleTextButtonColor = (state: ButtonState) => {
  switch (state) {
    case "enabled":
      return "white"
    case "disabled":
      return "rgba(255, 255, 255, 0.2)"
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
      state === "enabled" ? "rgba(255, 255, 255, 0.8)" : "default"};
  }
`

const handleActionButtonColor = (state: ActionButtonVariant) => {
  switch (state) {
    case "attack":
      return "#D94C4C"
    case "shield":
      return "#4782B2"
    case "charge":
      return "#6B6E75"
  }
}

export const ActionButton = styled.button<{
  variant: ActionButtonVariant
}>`
  color: white;
  background: ${({ variant }) => handleActionButtonColor(variant)};
  width: 92px;
  padding: 12px 16px;
  align-self: flex-end;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:active {
    filter: brightness(125%);
  }
`

export const TextInputField = styled.input`
  height: 48px;
  border-radius: 4px;
  padding: 18px;
  transition: all 0.12s ease-out;
  font-size: 16px;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  &:hover,
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`

/* 
  Animations
*/

export const ContainerAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
  },
}

export const FadeIn = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.6,
  },
}

export const DamageTakenAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 12,
  },
}

export const DamageDealtAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -12,
  },
}

export const Selectable = styled.span`
  -webkit-user-select: text; /* Safari */
  -moz-user-select: text; /* Firefox */
  -ms-user-select: text; /* IE10+/Edge */
  user-select: text; /* Standard */
`
