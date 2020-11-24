import styled, { css } from "styled-components"
import { clickable, noScrollbar } from "@/styles/mixins"
import { getOS } from "@/functions"

import { DropdownStyledProps, DropdownItemStyledProps } from "./model"


export const DropdownStyled = styled.div<DropdownStyledProps>`
  ${noScrollbar}
  display: flex;
  flex-direction: column;
  position: fixed;
  margin-top: 5px;
  z-index: 20005;
  border-radius: 10px;
  background: hsl(0, 0%, 95%);
  color: hsl(0, 0%, 50%);
  box-shadow: 0 5px 5px hsl(0, 0%, 80%);
  overflow: hidden;
  ${(props: DropdownStyledProps) => props.isSquare && css`
    & > div {
      display: flex;
      flex-wrap: wrap;
      @media screen and (orientation:portrait) {
        width: 80vw !important;
      }
      @media screen and (orientation:landscape) {
        width: 70vw !important;
      }
    }
  `}
`

export const DropdownItemStyled = styled.span<DropdownItemStyledProps>`
  ${clickable}
  display: flex;
  padding: 0 10px;
  align-items: center;
  height: 10vh;
  flex-shrink: 0;
  justify-content: center;
  width: 100%;

  ${(props: DropdownItemStyledProps) => props.italic && css`
    font-family: KaTeX_Math;
  `}
  &:not(:last-child) {
    border-bottom: 1px solid white;
  }
  ${(props: DropdownItemStyledProps) => props.isSquare && css`
    height: calc(100vh / 7);
    @media screen and (orientation:portrait) {
      width: 20vw;
    }
    @media screen and (orientation:landscape) {
      width: 10vw;
    }
    border-right: 1px solid ${window.theme.grey400};
    border-bottom: 1px solid ${window.theme.grey400} !important;
  `}
  ${() => (getOS() === "mac" || getOS() === "windows") && css`
    &:hover {
      background: white;
    }
  `}
  ${() => (getOS() === "ios" || getOS() === "android") && css`
    min-height: 50px;
  `}
  span {
    flex-shrink: 0;
  }
  span:first-child {
    margin-right: 20px;
    flex-shrink: 1;
    width: 100%;
  }
  div {
    display: flex;
  }
  div:first-child {
    margin-right: 10px;
  }
  sup {
    display: flex;
    height: 20px;
    font-size: 12px;
    margin-right: 3px;
  }
`
