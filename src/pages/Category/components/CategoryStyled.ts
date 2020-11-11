import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const CategoryStyled = styled.div<{}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 20px);
  .add-button {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    ${clickable};
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
    svg {
      margin-left: 20px;
      width: 15px;
      color: white;
    }
  }
  .create-vocabulary {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    margin: 20px 0;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    & > div {
      display: flex;
      width: 100%;
      &:not(:first-child) {
        border-top: 1px solid ${() => window.theme.primary100};
      }
      &:not(:last-child) {
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      &:last-child {
        justify-content: flex-end;
        padding-top: 10px;
      }
      input {
        flex: 1;
        height: 40px;
        padding: 0 20px;
        background: ${() => window.theme.grey100};
        transition: 0.3s all ease-in-out;
        &::placeholder {
          color: ${() => window.theme.grey400};
        }
      }
      h4 {
        display: flex;
        align-items: flex-end;
        flex-shrink: 0;
        padding: 0 20px;
      }
      span {
        ${center}
        height: 100%;
        background: ${() => window.theme.grey200};
        width: 100px;
        flex-shrink: 0;
      }
      .select {
        background: ${() => window.theme.primary600};
        color: white;
        width: 100px;
        height: 100%;
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
      & > svg {
          ${clickable};
          width: 30px;
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
  }
  .content {
    display: flex;
    justify-content: space-evenly;
    overflow: scroll;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 40px;
  }
`