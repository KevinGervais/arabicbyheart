import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const HarakatStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  filter: drop-shadow(0 0 5px hsla(0, 0%, 0%, 0.3));
  z-index: 10;
  bottom: 40px;
  .triangle {
    width: 0;
    height: 0;
    border-top: 15px solid  hsla(0, 0%, 100%, 0.8);
    border-left: 15px solid  transparent;
    border-right: 15px solid  transparent;
  }
  .content {
    display: grid;
    grid-template-columns: 40px 40px 40px 40px;
    grid-template-rows: 50px;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    padding: 10px;
    height: max-content;
    border-radius: 10px;
    background: ${() => window.theme.isDark ? "hsla(0, 0%, 0%, 0.7);" : "hsla(0, 0%, 100%, 0.8);"};
    backdrop-filter: blur(2px);

  }
  span {
    ${clickable};
    ${center};
    width: 40px;
    height: 50px;
    border-radius: 5px;
    font-size: 30px;
    font-family: system-ui;
    background: ${() => window.theme.isDark ? window.theme.grey800 : window.theme.grey200};
    box-shadow: 0 0 2px hsla(0, 0%, 0%, 0.3);
    ${() => ["mac", "windows"].includes(getOS()) && css`
      &:hover {
        background: ${() => window.theme.isDark ? window.theme.grey700 : window.theme.grey300};
      }
    `}
    &:active {
      background: ${() => window.theme.isDark ? window.theme.grey600 : window.theme.grey300};
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 630px) {
    flex-direction: row;
    right: 25px;
    bottom: auto;

    .content {
      grid-template-columns: 40px;
      overflow: auto;
      height: 300px;
      &::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }
      & > span:last-child {
        margin-bottom: 20px;
      }
    }
    .triangle {
      border-top: 15px solid  transparent;
      border-left: 15px solid ${() => window.theme.isDark ? "hsla(0, 0%, 0%, 0.7)" : "hsla(0, 0%, 100%, 0.8)"};
      border-bottom: 15px solid  transparent;
    }
  }
`