import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const BottomMenuStyled = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  overflow: hidden;
  border-radius: 25px;
   background: ${() => window.theme.isDark ? window.theme.grey900 : "white"};

  .right-content {
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
      color: ${() => window.theme.isDark ? window.theme.secondary50 : "white"};
      height: 20px;
    }
  }
`