import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const VocabularyItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:10px;
  border-radius: 10px;
  margin: 20px 0;
  width: 30%;
  max-width: 500px;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  @media screen and (max-width: 800px) {
    width: 45%;
  }
  @media screen and (max-width: 500px) {
    width: 95%;
  }
  .item {
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${() => window.theme.primary100};
    svg {
    ${clickable};
    width: 20px;
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
  h4 {
    ${center};
    height: 40px;
    width: 100%;
    background: ${() => window.theme.grey100};
  }
  span {
    ${center};
    height: 40px;
    width: 50px;
    background: ${() => window.theme.grey200};
  }
  & > svg {
    ${clickable};
    align-self: flex-end;
    padding-top: 10px;
    padding-right: 10px;
    width: 15px;
    color: ${() => window.theme.primary500};
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        color: ${() => window.theme.primary600};
      }
    `}
    &:active {
      color: ${() => window.theme.primary700};
    }
  }
`