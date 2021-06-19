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
  border-radius: 25px;
  background: ${() => window.theme.isDark ? window.theme.grey900 : "white"};
  .left-content {
    ${center};
    ${clickable};
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: ${() => window.theme.isDark ? window.theme.secondary300 : window.theme.secondary500};
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.isDark ? window.theme.secondary400 : window.theme.secondary600};
      }
    `}
    &:active {
      background: ${() => window.theme.isDark ? window.theme.secondary500 : window.theme.secondary700};
    }
    svg {
      color: ${() => window.theme.isDark ? window.theme.primary50 : "white"};
      height: 20px;
    }
  }
  .right-content {
    ${center};
    padding: 0 20px;
    div {
      ${center};
      ${clickable};
      padding: 0 10px;
      height: 25px;
      border-radius: 12.5px;
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