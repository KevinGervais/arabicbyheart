import { getOS } from "@/functions"
import { clickable, ellipsis, getNotch } from "@/styles/mixins"
import styled, { css } from "styled-components"

import { TitleBarStyledProps } from "./model"

export const TitleBarStyled = styled.div<TitleBarStyledProps>`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  display: flex;
  width: 100%;
  height: calc(50px + ${() => getNotch("top")});
  padding-bottom: 5px;
  background-size: 150px;
  -webkit-app-region: drag;
  flex-shrink: 0;
  background: ${window.theme.primary500};
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  transition: all 0.3s ease-in-out;
  h1 {
    ${ellipsis};
    font-size: 24px;
    color: white;
    width: max-content;
    max-width: 80vw;
    flex-shrink: 0;
  }
  .fa-chevron-right {
    ${clickable};
    height: 30px;
    margin-right: 20px;
    color: white;
    transform: rotate(-180deg);
  }
  .fa-pencil-alt, .fa-save, .fa-times {
    ${clickable};
    height: 20px;
    margin-left: 20px;
    color: white;
  }
  input {
    margin: 10px 0;
    padding-left: 15px;
    height: 30px;
    font-size: 24px;
    color: white;
    background: ${() => window.theme.primary400};
  }
  ${(props: TitleBarStyledProps) => props.page === "diapositive" && css`
    background: hsla(0, 0%, 0%, 0.15);
    position: fixed;
    top: 0;
    left: 0;
    h1, svg {
      color: black;
    }
  `}


  @media screen and (orientation:portrait) {
    ${() => getOS() === "ios" && css`
      padding-top: env(safe-area-inset-top);
    `}
    ${() => getOS() === "android" && css`
      padding-top: max(env(safe-area-inset-top), 24px);
    `}
  }
  @media screen and (orientation:landscape) {
    ${() => (getOS() === "ios" || getOS() === "android") && css`
      display: none;
    `}
  }
`
