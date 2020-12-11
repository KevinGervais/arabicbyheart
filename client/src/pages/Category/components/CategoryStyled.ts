import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

import { CategoryStyledProps } from "../model"

export const CategoryStyled = styled.div<CategoryStyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  .add-button-wrapper {
    ${center};
    position: absolute;
    background: hsla(0, 0%, 100%, 0.1);
    width: 100%;
    height: 80px;
    flex-shrink: 0;
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
    width: calc(100vw - 20px);
    max-width: 500px;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    background: white;
    .buttons {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      padding-top: 10px;

      svg {
          ${clickable};
          width: 30px;
          height: 20px;
          padding: 5px 10px;
          margin-left: 10px;
          border-radius: 15px;
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
    ${(props: CategoryStyledProps) => !props.isMultipleCategory && css`
      padding-top: 80px;
    `}
    padding-bottom: 100px;
  }
`