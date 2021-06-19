import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const ModalFooterStyled = styled.div<{}>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 100;
  height: 50px;
  padding: 0 20px;
  flex-shrink: 0;
  color: white;
  justify-content: flex-end;
  .button {
    ${center};
    ${clickable};
    height: 30px;
    padding: 0 15px;
    margin-left: 10px;
    min-width: 100px;
    background: ${() => window.theme.isDark ? window.theme.primary800 : window.theme.secondary500};
    color: ${() => window.theme.isDark ? window.theme.primary50 : "white"};
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.isDark ? window.theme.primary700 : window.theme.secondary600};
      }
    `}
    &:active {
      background: ${() => window.theme.isDark ? window.theme.primary600 : window.theme.secondary700};
    }
  }
`
