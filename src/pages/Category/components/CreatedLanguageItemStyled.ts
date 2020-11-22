import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const CreatedLanguageItemStyled = styled.div<{}>`
  display: flex;
  width: 100%;
  &:not(:first-child) {
    border-top: 1px solid ${() => window.theme.primary100};
  }
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 40px;


  input {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background: ${() => window.theme.grey100};
    transition: 0.3s all ease-in-out;
    &::placeholder {
      color: ${() => window.theme.grey400};
    }
    &.arabic-input {
      direction:RTL;
    }
  }
  h4 {
    ${center};
    flex-shrink: 0;
    padding: 0 20px;
    background: ${() => window.theme.grey200};
    width: 40px;
    height: 100%;
  }
  span {
    ${center}
    height: 100%;
    background: ${() => window.theme.grey200};
    width: 100px;
    flex-shrink: 0;
  }
  svg {
    ${clickable};
    width: 30px;
    height: 20px;
    padding: 10px 20px;
    background: ${() => window.theme.primary500};
    color: white;
    flex-shrink: 0;
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.primary600};
      }
    `}
    &:active {
      background: ${() => window.theme.primary700};
    }
  }
  .button {
    ${center}
    ${clickable}
    height: 30px;
    padding: 0 20px;
    border-radius: 20px;
    color: white;
    background: ${() => window.theme.primary500};
    &:not(:last-child) {
      margin-right: 10px;
    }
    svg {
      color: white;
      height: 20px;
    }
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.primary600};
      }
    `}
    &:active {
      background: ${() => window.theme.primary700};
    }
  }
`