import styled from "styled-components"
import { center } from "@/styles/mixins"

export const ModalBackgroundStyled = styled.div<{}>`
  ${center}
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20000;
  background: hsla(0, 0%, 100%, 0.1);
  backdrop-filter: blur(2px);
  @media (max-width: 500px) {
    padding: 0 !important;
  }
`
