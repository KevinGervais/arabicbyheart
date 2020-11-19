import React from "react"
import { connect } from "react-redux"
import { ReduxState } from "@/redux/model"
import RightArrowIcon from "@/images/rightArrow"
import { setReduxState } from "@/redux"

import { TitleBarStyled } from "./TitleBarStyled"
import { TitleBarProps, TitleBarState } from "./model"

class TitleBarClass extends React.Component<TitleBarProps, TitleBarState> {
  constructor(props: TitleBarProps) {
    super(props)
    this.state = { isFullScreen: window.innerHeight === window.screen.height }
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    window.addEventListener("resize", this.toggleFullScreen)
  }

  public toggleFullScreen(): void {
    const { isFullScreen } = this.state

    if (window.innerHeight === window.screen.height && !isFullScreen) {
      this.setState({ isFullScreen: true })
    } else if (window.innerHeight !== window.screen.height && isFullScreen) {
      this.setState({ isFullScreen: false })
    }
  }
  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.toggleFullScreen)
  }

  public render(): JSX.Element | null {
    const { page, say, selectedCategory, selectedLanguage } = this.props
    return (
      <TitleBarStyled page={page}>
        {page !== "home" && <div onClick={() => setReduxState({ page: page === "diapositive" ? "category" : "home" })}><RightArrowIcon /></div>}
        <h1>{page === "category" ? ((selectedCategory ? selectedCategory.title[selectedLanguage] : " ") || say[page]) : say[page]}</h1>
      </TitleBarStyled>
    )
  }
}

export const TitleBar = connect((state: ReduxState): TitleBarProps => ({
  themeColor: state.themeColor,
  page: state.page,
  say: state.say,
  selectedCategory: state.selectedCategory,
  selectedLanguage: state.selectedLanguage
}))(TitleBarClass)