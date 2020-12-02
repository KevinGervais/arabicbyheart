import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const HomeStyled = styled.div<{}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .add-button {
    ${center};
    ${clickable};
    width: 300px;
    height: 40px;
    padding: 0 20px;
    margin: 20px 0;
    border-radius: 20px;
    background: ${() => window.theme.primary500};
    color: white;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    transition: 0.3s all ease-in-out;
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        transform: scale(1.025);
      }
    `}
    &:active {
      transform: scale(1.025);
      background: ${() => window.theme.primary600};
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
    background: white;
    width: 100%;
    max-width: 600px;
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
    background: ${() => window.theme.secondary500};
    color: white;
  }
  .fa-bookmark {
    margin: 0 15px 0 5px;
  }
`