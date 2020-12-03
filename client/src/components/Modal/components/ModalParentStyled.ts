import styled from "styled-components"

export const ModalParentStyled = styled.div<{}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 600px;
  max-height: calc(100% - 100px);
  background-color: white;
  width: calc(100% - 100px);
  border-radius: 10px;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.3);
  &.full-screen {
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
    border-radius: 0;
    .modal-header h4 {
      position: absolute;
      width: calc(100% - 45px);
      text-align: center;
    }
  }
  @media (max-width: 500px) {
    border-radius: 0 !important;
    box-shadow: none !important;
    width: 100% !important;
    max-width: none;
    max-height: 100% !important;
  }
`
