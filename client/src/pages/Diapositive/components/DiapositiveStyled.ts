import { getOS } from "@/functions"
import { colors } from "@/styles/colors"
import { center, clickable } from "@/styles/mixins"
import { AllColors } from "@/styles/model"
import styled, { css } from "styled-components"

import { DiapositiveStyledProps } from "../model"
const colorList = Object.keys(colors).sort(() => Math.random() - 0.5)

export const DiapositiveStyled = styled.div<DiapositiveStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  ${(props: DiapositiveStyledProps) => {
    const index = props.index % 15
    const colorName = colorList[index] as keyof AllColors
    const color = colors[colorName]
    return css`
      background: ${color[100]};
      span, svg, input, h4, h3, .harakat div {
        color: ${color[700]};
      }
      .harakat {
        border:  3px dashed ${color[700]};
      }
      ${props.index === 0 && css`
        .content > svg:first-child {
          color: ${color[200]} !important;
          border: 3px solid ${color[200]};
          pointer-events: none;
        }
      `}
      ${props.index === props.indexCount - 1 && css`
        .content > svg:last-child {
          color: ${color[200]} !important;
          border: 3px solid ${color[200]};
          pointer-events: none;
        }
      `}

      svg:not(.fa-play), h4 {
        border: 3px solid ${color[700]};
        ${() => ["mac", "windows"].includes(getOS()) && css`
          &:hover {
            transform: scale(1.05);
            &:first-child {
              transform: rotate(180deg) scale(1.05);
            }
          }
        `}

        &:active {
          transform: scale(1.05);
          &:first-child {
            transform: rotate(180deg) scale(1.05);
          }
          color: ${color[900]};
          border: 3px solid ${color[900]};
        }
      }
      h4 {
        width: max-content;
        border: 2px solid ${color[700]};
      }
    `
  }}
  .content {
    ${center};
      & > svg {
      ${clickable};
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      padding: 10px;
      border-radius: 29px;
      margin: 0 10vw;
      transition: 0.3s all ease-in-out;
      &:first-child {
        left: 30vw;
        transform: rotate(180deg);
      }
      &:last-child {
        right: 30vw;
      }
    }
  }
  h3 {
    position: fixed;
    width: 100vw;
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    top: 100px;
    left: 0;
  }

  input {
    position: fixed;
    width: 100vw;
    text-align: center;
    bottom: 30px;
    left: 0;
    background: transparent;
    pointer-events: none;
    font-size: 30px;
  }
  .fa-play {
    width: 30px !important;
  }
  @media screen and (max-width: 700px) {
    .content > svg {
      position: fixed;
      bottom: 50px;
      margin: 0;
      &:first-child {
        left: auto;
        right: calc(50vw + 50px) !important;
      }
      &:last-child {
        right: auto;
        left: calc(50vw + 50px)  !important;
      }
    }
  }
`