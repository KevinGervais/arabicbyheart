import { getOS } from "@/functions"
import { clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const VocabularyCategoryStyled = styled.div`
  ${clickable};
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  &:not(:last-child) {
    border-bottom: 1px solid ${() => window.theme.grey300};
  }
  h1 {
    flex: 1;
  }
  svg {
    width: 15px;
    color: ${() => window.theme.primary500};
  }
  ${() => ["mac", "windows"].includes(getOS()) && css`
        &:hover {
          background: ${() => window.theme.grey100};
        }
  `}
      &:active {
        background: ${() => window.theme.grey200};
      }
`