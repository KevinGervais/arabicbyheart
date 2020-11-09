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
  background: white;
  .left-content {
    ${center};
    ${clickable};
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: ${() => window.theme.secondary500};
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.secondary600};
      }
    `}
    &:active {
      background: ${() => window.theme.secondary700};
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
      border: 2px solid ${() => getColor("red", "secondary").secondary500};
      color: ${() => getColor("red", "secondary").secondary500};
      margin-left: 20px;
      ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => getColor("red", "secondary").secondary50};
      }
    `}
    &:active {
      background: ${() => getColor("red", "secondary").secondary100};
    }
    }
  }
`