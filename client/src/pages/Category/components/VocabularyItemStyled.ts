import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const VocabularyItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding:10px;
  border-radius: 10px;
  margin: 20px 0;
  width: 30%;
  max-width: 500px;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  background: ${() => window.theme.isDark ? window.theme.grey900 : "white"};

  .vertical-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

  }
  .buttons {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    padding-top: 15px;
    padding-right: 5px;
    svg {
      ${clickable};
      margin-left: 15px;
      align-self: flex-end;
      height: 20px;
      color: ${() => window.theme.isDark ? window.theme.primary300 : window.theme.primary500};
      ${() => ["mac", "windows"].includes(getOS()) && css`
        &:hover {
          color: ${() => window.theme.isDark ? window.theme.primary400 : window.theme.primary600};
        }
      `}
      &:active {
        color: ${() => window.theme.isDark ? window.theme.primary500 : window.theme.primary700};
      }
    }
  }
  @media screen and (max-width: 800px) {
    width: 45%;
  }
  @media screen and (max-width: 500px) {
    width: 95%;
  }
  .img {
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    width: 60px;
    height: 60px;
    margin-right: 10px;
    flex-shrink: 0;

    svg {
      ${clickable};
      position: absolute;
      width: 30px;
      height: 30px;
      padding: 15px;
      background: hsla(0, 0%, 0%, 0.3);
      left: 0;
      top: 0;
      opacity: 0;
      color: white;
      transition: all 0.3s ease-in-out;
    }
    &:hover svg {
      opacity: 1;
    }
  }
  img {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
  .item {
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${() => window.theme.isDark ? window.theme.primary700 : window.theme.primary100};
    &:nth-child(2) h4 {
    font-size: 24px;
    font-family: system-ui;
  }
    svg {
      ${clickable};
      width: 30px;
      height: 30px;
      padding: 5px 20px;
      background: ${() => window.theme.isDark ? window.theme.primary800 : window.theme.primary500};
      color: ${() => window.theme.isDark ? window.theme.primary50 : "white"};
      ${() => ["mac", "windows"].includes(getOS()) && css`
        &:hover {
          background: ${() => window.theme.isDark ? window.theme.primary700 : window.theme.primary600};
        }
      `}
      &:active {
        background: ${() => window.theme.isDark ? window.theme.primary600 : window.theme.primary700};
      }
    }
    h4 {
      ${center};
      height: 40px;
      width: 100%;
      background: ${() => window.theme.isDark ? window.theme.grey850 : window.theme.grey100};
    }
    span {
      ${center};
      height: 40px;
      width: 50px;
      background: ${() => window.theme.isDark ? window.theme.grey800 : window.theme.grey200};
    }
  }
`