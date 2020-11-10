import { getOS } from "@/functions"
import { colors } from "@/styles/colors"
import { center, clickable } from "@/styles/mixins"
import { AllColors } from "@/styles/model"
import styled, { css } from "styled-components"

import { DiapositiveStyledProps } from "./model"
const colorList = Object.keys(colors).sort(Math.random)

export const DiapositiveStyled = styled.div<DiapositiveStyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  ${(props: DiapositiveStyledProps) => {
    const index = props.index % 15
    const colorName = colorList[index] as keyof AllColors
    const color = colors[colorName]
    return css`
      background: ${color[100]};
      span, svg, input, h4, h3 {
        color: ${color[700]};
      }
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
        border: 2px solid ${color[700]};
      }
    `
  }}
  .content {
    ${center};
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
  & > svg {
    ${clickable};
    width: 30px;
    height: 30px;
    padding: 10px;
    border-radius: 29px;
    margin: 50px;
    transition: 0.3s all ease-in-out;
    &:first-child {
      transform: rotate(180deg);
    }
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
`