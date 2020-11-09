import styled from "styled-components"
import { noScrollbar } from "@/styles/mixins"


export const NavDropdownStyled = styled.div<{}>`
  ${noScrollbar}
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 5px;
  z-index: 20005;
  border-radius: 10px 0 0 0;
  background: url("./images/whitenoise.png");
  background-size: 150px;
  color: hsl(0, 0%, 50%);
  overflow: hidden;

  border-radius: 0 10px 0 0;
  top: 0;
  box-shadow:
    0px 0px 3px hsla(0, 0%, 0%, 0.1),
    2px -3px 3px hsla(0, 0%, 0%, 0.1),
    2px 3px 3px hsla(0, 0%, 0%, 0.1);
  @media screen and (orientation:portrait) and (max-width: 344px) {
    left: 71px;
  }
  @media screen and (orientation:portrait) and (min-width: 345px) {
    left: calc(20vw);
  }
  @media screen and (orientation:landscape) and (max-width: 700px){
    left: 71px;
  }
  @media screen and (orientation:landscape) and (min-width: 701px){
    left: calc(10vw + 1px);
  }
`
