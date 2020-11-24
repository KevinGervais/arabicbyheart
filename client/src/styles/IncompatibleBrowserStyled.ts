import { center } from "@/styles/mixins"
import styled from "styled-components"

export const IncompatibleBrowserStyled = styled.div`
  ${center}
  width: 100%;
  height: 100%;
  background: ${() => window.theme.primary200};
  font-size: 30px;
  text-align: center;
  span {
    width: 80vw;
    max-width: 500px;
    color: ${() => window.theme.primary900};
  }
`
