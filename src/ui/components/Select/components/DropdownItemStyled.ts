import styled, { css } from "styled-components"
import { clickable } from "@/styles/mixins"
import { getOS } from "@/functions"

import { DropdownItemStyledProps } from "../model"

export const DropdownItemStyled = styled.span<DropdownItemStyledProps>`
  ${clickable}
  display: flex;
  padding: 0 2.5vw;
  align-items: center;
  height: 10vh;
  flex-shrink: 0;
  min-width: 100%;
  width: max-content;
  color: hsl(0, 0%, 30%);
  &:not(:last-child) {
    border-bottom: 1px solid hsl(0, 0%, 95%);
  }
  ${() => (getOS() === "mac" || getOS() === "windows") && css`
    &:hover {
      background: hsla(0, 0%, 30%, 0.05);
    }
  `}
  ${() => (getOS() === "ios" || getOS() === "android") && css`
    min-height: 50px;

  `}
  &:active {
        background: hsla(0, 0%, 30%, 0.1);
      }
      svg {
    color: hsl(0, 0%, 30%);
    height: 20px;
    margin-right: 2.5vw;
  }
  ${(props: DropdownItemStyledProps) => props.isActive && css`
    color: white;
    background: ${window.theme.primary500};
    svg {
      color: white;
    }
    ${() => (getOS() === "mac" || getOS() === "windows") && css`
      &:hover {
        background: ${window.theme.primary500};
      }
    `}
    &:active {
      background: ${window.theme.primary500};
      }
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

  sup {
    display: flex;
    height: 20px;
    font-size: 12px;
    margin-right: 3px;
  }

`
