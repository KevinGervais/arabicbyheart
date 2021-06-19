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
  color: ${() => window.theme.isDark ? window.theme.primary50 : window.theme.primary800};
  background: ${() => window.theme.isDark ? window.theme.primary800 : window.theme.primary100};
`
