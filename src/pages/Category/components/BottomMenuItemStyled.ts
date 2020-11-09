import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

import { BottomMenuItemStyledProps } from "../model"

export const BottomMenuItemStyled = styled.div<BottomMenuItemStyledProps>`
  ${center};
  ${clickable};
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 25px;
  border: 1px solid ${() => window.theme.primary300};
  svg {
    height: 25px;
    color: inherit;
  }
  ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.primary50};
      }
    `}
    &:active {
      background: ${() => window.theme.primary100};
    }
  ${(props: BottomMenuItemStyledProps) => props.isActive && css`
    background: ${() => window.theme.primary300};
    color: white;
    svg {
      color: inherit;
    }
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.primary400};
      }
    `}
    &:active {
      background: ${() => window.theme.primary500};
    }
  `}
`