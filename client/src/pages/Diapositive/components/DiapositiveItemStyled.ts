import { getOS } from "@/functions"
import { center, clickable } from "@/styles/mixins"
import styled, { css } from "styled-components"

export const DiapositiveItemStyled = styled.div<{}>`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    span:not(:last-child) {
      font-size: 50px;
      font-weight: bold;
    }
    .harakat {
      ${clickable}
      width: 35px;
      height: 35px;
      border-radius: 50%;
      position: relative;
      margin-left: 20px;
      ${() => ["mac", "windows"].includes(getOS()) && css`
          &:hover {
            transform: scale(1.025);
          }
        `}
        &:active {
          transform: scale(1.025);
        }
      div {
        font-size: 50px;
        position: absolute;
        left: 6px;
        top: 10px;
      }
    }
    span {
      ${center}
      flex-wrap: wrap;
      margin-bottom: 40px;
      svg {
      ${clickable};
        margin-left: 20px;
        width: 20px;
        border: none;
        margin-top: 5px;
        flex-shrink: 0;
        ${() => ["mac", "windows"].includes(getOS()) && css`
          &:hover {
            transform: scale(1.025);
          }
        `}
        &:active {
          transform: scale(1.025);
        }
      }
    }
    span:last-child {
      font-size: 24px;
      position: fixed;
      width: 100vw;
      text-align: center;
      top: 150px;
      left: 0;
    }
    h4 {
      ${clickable};
      ${center};
      flex-shrink: 0;
      margin-top: 30px;
      transition: 0.3s all ease-in-out;
      height: 30px;
      padding: 0 15px;

    }
    img {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 30px;
    }
  .arabic {
    font-family: system-ui;
  }
`