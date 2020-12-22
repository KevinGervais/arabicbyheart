import React from "react"
import { connect } from "react-redux"
import { ReduxState } from "@/redux/model"
import RightArrowIcon from "@/images/rightArrow"
import { setReduxState } from "@/redux"
import PencilIcon from "@/images/pencil"
import CloseIcon from "@/images/close"
import SaveIcon from "@/images/save"
import { editCategoryTitle } from "@/pages/Category/functions"

import { TitleBarStyled } from "./TitleBarStyled"
import { TitleBarProps, TitleBarState } from "./model"

class TitleBarClass extends React.Component<TitleBarProps, TitleBarState> {
  constructor(props: TitleBarProps) {
    super(props)
    this.state = {
      isFullScreen: window.innerHeight === window.screen.height,
      isEditingCategory: false,
      categoryTitle: "",
    }
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

  public componentDidUpdate(oldProps: TitleBarProps): void {
    const { page } = this.props
    const { isEditingCategory } = this.state
    if (oldProps.page !== page && isEditingCategory) {
      this.setState({ isEditingCategory: false, categoryTitle: "" })
    }
  }
  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.toggleFullScreen)
  }

  public render(): JSX.Element | null {
    const { isEditingCategory, categoryTitle } = this.state
    const { page, say, selectedCategory, selectedLanguage, selectedVocabularyItem } = this.props
    if (page === "home") {
      return (
        <TitleBarStyled page={page}>
          <h1>{say.home}</h1>
        </TitleBarStyled>
      )
    } else if (page === "category") {
      if (selectedCategory) {
        if (isEditingCategory) {
          return (
            <TitleBarStyled page={page}>
              <div onClick={() => setReduxState({ page: "home" })}><RightArrowIcon /></div>
              <input
                value={categoryTitle}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => this.setState({ categoryTitle: evt.target.value })}
              />
              <SaveIcon
                data-tip={say.save}
                onClick={() => editCategoryTitle(categoryTitle, () => this.setState({ isEditingCategory: false, categoryTitle: "" }))}
              />
              <CloseIcon
                data-tip={say.cancel}
                onClick={() => this.setState({ isEditingCategory: false, categoryTitle: "" })}
              />
            </TitleBarStyled>
          )
        } else {
          const { isMultipleCategory } = selectedCategory
          return (
            <TitleBarStyled page={page}>
              <div onClick={() => setReduxState({ page: "home" })}><RightArrowIcon /></div>
              <h1>{selectedCategory.title[selectedLanguage]}</h1>
              {!isMultipleCategory && (
                <PencilIcon onClick={() => this.setState({ isEditingCategory: true, categoryTitle: selectedCategory.title[selectedLanguage] })} />
              )}
            </TitleBarStyled>
          )
        }
      }
    } else if (page === "diapositive") {
      return (
        <TitleBarStyled page={page}>
          <div onClick={() => setReduxState({ page: "category" })}><RightArrowIcon /></div>
          <h1>{say.diapositive}</h1>
        </TitleBarStyled>
      )
    } else if (page === "verses") {
      return (
        <TitleBarStyled page={page}>
          <div onClick={() => setReduxState({ page: "category" })}><RightArrowIcon /></div>
          <h1>{say.versesTitle.replace("{word}", selectedVocabularyItem?.languageItems.ar.title || "")}</h1>
        </TitleBarStyled>
      )
    }
    return <TitleBarStyled page={page} />
  }
}

export const TitleBar = connect((state: ReduxState): TitleBarProps => ({
  themeColor: state.themeColor,
  page: state.page,
  say: state.say,
  selectedCategory: state.selectedCategory,
  selectedLanguage: state.selectedLanguage,
  selectedVocabularyItem: state.selectedVocabularyItem
}))(TitleBarClass)