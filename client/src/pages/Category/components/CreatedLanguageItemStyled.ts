import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const CreatedLanguageItemStyled = styled.div<{}>`
  display: flex;
  width: 100%;
  &:not(:first-child) {
    border-top: 1px solid ${() => window.theme.isDark ? window.theme.primary300 : window.theme.primary100};
  }
  display: flex;
  align-items: center;
  height: 40px;
  &.arabic {
    height: 50px;
    .fa-stop, .fa-micro {
      padding: 15px 20px;
    }
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background: ${() => window.theme.isDark ? window.theme.grey850 : window.theme.grey100};
    transition: 0.3s all ease-in-out;
    &.arabic-input {
      direction: RTL;
      font-size: 24px;
    }
    &::placeholder {
      font-size: 16px;
      color: ${() => window.theme.isDark ? window.theme.grey700 : window.theme.grey400};
    }
  }
  h4 {
    ${center};
    flex-shrink: 0;
    padding: 0 20px;
    background: ${() => window.theme.isDark ? window.theme.grey800 : window.theme.grey200};
    width: 40px;
    height: 100%;
  }
  span {
    ${center}
    height: 100%;
    background: ${() => window.theme.isDark ? window.theme.grey800 : window.theme.grey200};
    width: 100px;
    flex-shrink: 0;
  }
  .keyboard-button {
    ${center};
    height: 100%;
    padding-left: 10px;
    position: relative;
    background: ${() => window.theme.isDark ? window.theme.grey850 : window.theme.grey100};
    @media screen and (max-width: 630px) {
      padding-left: 20px;
    }
  }
  .fa-keyboard {
    height: 30px;
    color: ${() => window.theme.isDark ? window.theme.secondary300 : window.theme.secondary500};

    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        color: ${() => window.theme.isDark ? window.theme.secondary400 : window.theme.secondary600};
      }
    `}
      &:active {
        color: ${() => window.theme.isDark ? window.theme.secondary500 : window.theme.secondary700};
      }
  }
`
