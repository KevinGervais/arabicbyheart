import styled from "styled-components"
import { center } from "@/styles/mixins"

export const ModalHeaderStyled = styled.div<{}>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 100;
  height: 50px;
  padding: 0 20px;
  flex-shrink: 0;
  font-weight: 400;
  color: ${(): string => window.theme.primary800};
  background: ${(): string => window.theme.primary100};
  label {
    background: ${(): string => window.theme.primary900};
    color: ${(): string => window.theme.primary800};
  }
  & > * {
    flex-shrink: 0;
  }
  .modal-title {
    color: white;
    width: 100%;
    flex-shrink: 1;
  }
  .fa-angle-left {
    ${center}
    position: relative;
    z-index: 10;
    border-radius: 15px;
    font-size: 25px;
    height: 30px;
    width: 30px;
    cursor: pointer;
    border: 2px solid ${(): string => window.theme.primary700};
    color: ${(): string => window.theme.primary700};
  }
`
