import { getOS } from "@/functions"
import { getColor } from "@/styles/getColor"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const DeleteButtonStyled = styled.div<{}>`
  display: flex;
  position: fixed;
  bottom: 30px;
  left: 30px;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  overflow: hidden;
  border-radius: 30px;
  .left-content {
    ${center};
    ${clickable};
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: ${() => window.theme.primary500};
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.primary600};
      }
    `}
    &:active {
      background: ${() => window.theme.primary700};
    }
    svg {
      color: white;
      height: 25px;
    }
  }
  .right-content {
    ${center};
    padding: 0 20px;
    div {
      ${center};
      ${clickable};
      padding: 10px;
      height: 30px;
      border-radius: 10px;
      border: 2px solid ${() => getColor("red", "primary").primary500};
      color: ${() => getColor("red", "primary").primary500};
      margin-left: 20px;
      ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => getColor("red", "primary").primary50};
      }
    `}
    &:active {
      background: ${() => getColor("red", "primary").primary100};
    }
    }
  }
`