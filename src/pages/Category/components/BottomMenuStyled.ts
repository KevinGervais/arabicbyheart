import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const BottomMenuStyled = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  overflow: hidden;
  border-radius: 30px;
  background: white;
  .right-content {
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
`