import React from "react"
import { connect } from "react-redux"
import { ReduxState } from "@/redux/model"

import { TitleBar } from "../components"
import { Home, Category, Diapositive } from "../../pages"

import { RoutesStyled } from "./RoutesStyled"
import { RoutesProps } from "./model"

const RoutesNotConnected = (props: RoutesProps): JSX.Element => {
  const { page } = props
  return (
    <RoutesStyled>
      <TitleBar />
      <div className="page-content">
        {page === "home" && <Home />}
        {page === "category" && <Category />}
        {page === "diapositive" && <Diapositive />}
      </div>
    </RoutesStyled>
  )
}

export const Routes = connect(
  (state: ReduxState): RoutesProps => ({
    page: state.page,
  })
)(RoutesNotConnected)
