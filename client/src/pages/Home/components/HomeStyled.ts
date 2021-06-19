import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const HomeStyled = styled.div<{}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  .add-button {
    ${center};
    ${clickable};
    width: 300px;
    height: 40px;
    padding: 0 20px;
    margin: 20px 0;
    border-radius: 20px;
    flex-shrink: 0;
    background: ${() => window.theme.isDark ? window.theme.primary800 : window.theme.primary500};
    color: ${() => window.theme.isDark ? window.theme.primary50 : "white"};
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    transition: 0.3s all ease-in-out;
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        transform: scale(1.025);
      }
    `}
    &:active {
      transform: scale(1.025);
      background: ${() => window.theme.isDark ? window.theme.primary700 : window.theme.primary600};
    }
  }
  .toggle {
    margin-left: 0px;
  }
  .input {
    display: flex;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    border-radius: 20px;
    margin: 20px 0;
    overflow: hidden;
    input {
      width: 200px;
      height: 40px;
      padding: 0 20px;
      background: ${() => window.theme.grey100};
      transition: 0.3s all ease-in-out;
      &::placeholder {
        color: ${() => window.theme.grey400};
      }
      &:nth-child(2) {
        width: 70px;
        background: ${() => window.theme.grey200};
      }
    }
    svg {
      ${clickable};
      height: 20px;
      padding: 10px 20px;
      background: ${() => window.theme.primary500};
      color: white;
      ${() => ["mac", "windows"].includes(getOS()) && css`
        &:hover {
          background: ${() => window.theme.primary600};
        }
      `}
      &:active {
        background: ${() => window.theme.primary700};
      }
    }
  }

  .category-list {
    background: ${() => window.theme.isDark ? window.theme.grey900 : "white"};
    width: 100%;
    max-width: 600px;
    height: calc(100% -80px);
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  }
  & > .fa-chevron-right {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 20px;
    height: 20px;
    padding: 15px;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    border-radius: 25px;
    background: ${() => window.theme.isDark ? window.theme.primary300 : window.theme.secondary500};
    color: white;
  }
`