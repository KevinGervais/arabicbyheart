import styled from "styled-components"

export const ModalFooterStyled = styled.div<{}>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 100;
  height: 50px;
  padding: 0 20px;
  flex-shrink: 0;
  color: white;
  justify-content: flex-end;
  .button {
    margin-left: 10px;
    min-width: 100px;
  }
`
