import styled, { css } from "styled-components"
import { center, clickable } from "@/styles/mixins"
import { getOS } from "@/functions"

import { ToggleStyledProps } from "./model"

export const ToggleStyled = styled.div<ToggleStyledProps>`
    ${center}
    ${clickable}
    flex-direction: row;
    margin: 0 20px;
    color: ${(): string => window.theme.primary700};
    text-align: center;
    ${() => (getOS() === "mac" || getOS() === "windows") && css`
      &:hover .square {
          border-color: ${(): string => window.theme.primary700}
      }
    `}
    .square {
        ${center}
        height: 26px;
        width: 26px;
        color: transparent;
        border: 2px solid ${(): string => window.theme.primary500};
        border-radius: 5px;
        transition: 0.1s font-size ease-in-out;
        font-size: 20px;
        margin-right: 5px;
    }

    ${(props: ToggleStyledProps): any => props.active && css`
      .square {
        color: ${window.theme.primary500};
      }
        ${() => (getOS() === "mac" || getOS() === "windows") && css`
          &:hover .square {
              color: ${(): string => window.theme.primary700};
          }
        `}
    `}
    &:active {
            color: ${(): string => window.theme.primary500};
            .square {
              color: ${(): string => window.theme.primary500};
            }
    }
`
