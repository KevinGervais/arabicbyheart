import { center } from "@/styles/mixins"
import styled from "styled-components"

export const VersesStyled = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 20px;
  width: 100%;
  padding: 20px 0;
  overflow: auto;
  .verse {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    width: calc(100vw - 50px);
    max-width: 700px;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
    background: ${() => window.theme.isDark ? window.theme.grey900 : "white"};
  }
  .arabic {
    text-align: right;
    font-size: 30px;
    font-family: system-ui;
    line-height: 150%;
    word-spacing: 7px;
    span {
      color: ${() => window.theme.isDark ? window.theme.secondary300 : window.theme.secondary500};
    }
  }
  .translation {
    line-height: 125%;
  }
  .key {
    ${center};
    height: 30px;
    padding: 0 10px;
    color: ${() => window.theme.isDark ? window.theme.secondary300 : window.theme.primary500};
    border: 2px solid ${() => window.theme.isDark ? window.theme.secondary300 : window.theme.primary500}
  }
`