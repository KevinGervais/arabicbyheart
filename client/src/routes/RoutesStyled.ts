import styled, { css } from "styled-components"
import { getOS, isElectron } from "@/functions"
import { getNotch } from "@/styles/mixins"

export const RoutesStyled = styled.div<{}>`
  display: flex;
  flex-direction: column;
  background: url("images/tasbih.svg");
  background-size: 200px;
  background-color: ${() => window.theme.primary50};
  ${() =>
    getOS() === "windows" && isElectron()
      ? css`
          height: calc(100vh - 32px);
        `
      : css`
          height: inherit;
        `}
  ${() => (getOS() === "ios" || getOS() === "android") && css`
    *:not(input) {
      user-select: none;
    }
  `}
  & > .page-content {
    display: flex;
    height: calc(100vh - 50px - ${getNotch("top")});
    @media screen and (orientation: portrait) {
      ${() => getOS() === "android" && css`
        height: calc(100vh - max(env(safe-area-inset-top), 24px));
      `}
    }
  }
`
