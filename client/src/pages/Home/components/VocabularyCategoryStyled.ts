import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const VocabularyCategoryStyled = styled.div`
  ${clickable};
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  &:not(:last-child) {
    border-bottom: 1px solid ${() => window.theme.isDark ? window.theme.grey800 : window.theme.grey300};
  }
  h1 {
    flex: 1;
  }
  span {
    ${center};
    height: 30px;
    padding: 0 15px;
    margin-right: 20px;
    border-radius: 5px;
    background: ${() => window.theme.isDark ? window.theme.grey800 : window.theme.grey200};
  }
  svg {
    width: 15px;
    color: ${() => window.theme.isDark ? window.theme.primary300 : window.theme.primary500};
  }
  ${() => ["mac", "windows"].includes(getOS()) && css`
        &:hover {
          background: ${() => window.theme.isDark ? window.theme.grey850 : window.theme.grey100};
          span {
            background: ${() => window.theme.isDark ? window.theme.grey700 : window.theme.grey300};
          }
        }
  `}
      &:active {
        background: ${() => window.theme.isDark ? window.theme.grey800 : window.theme.grey200};
        span {
            background: ${() => window.theme.isDark ? window.theme.grey600 : window.theme.grey400};
          }
      }
  .fa-bookmark {
    margin: 0 30px 0 5px;
  }
`