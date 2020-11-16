import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const CategoryStyled = styled.div<{}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 20px);
  .add-button-wrapper {
    ${center};
    position: absolute;
    background: hsla(0, 0%, 100%, 0.1);
    width: 100%;
    padding: 20px 0;
    backdrop-filter: blur(2px);
    border-bottom: 2px solid ${() => window.theme.primary200};
  }
  .add-button {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    ${clickable};
    height: 40px;
    padding: 0 20px;
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
  .create-vocabulary-wrapper {
    ${center};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: hsla(0, 0%, 100%, 0.1);
    backdrop-filter: blur(2px);
  }
  .create-vocabulary {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    margin: 20px 0;
    width: calc(100vw - 60px);
    max-width: 600px;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    background: white;
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
        height: 40px;
        @media screen and (max-width: 600px) {
          margin-top: 20px;
          border-top: none;
          flex-wrap: wrap;
          height: initial;
          h4 {
            display: flex;
            width: 100%;
            align-items: center;
          }
          input, .select, span, h4 {
            height: 40px;
            width: 100%;
          }
        }
      }
      &:last-child {
        justify-content: flex-end;
        padding-top: 10px;
      }
      input {
        flex: 1;
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
    padding-top: 80px;
    padding-bottom: 100px;
  }
`