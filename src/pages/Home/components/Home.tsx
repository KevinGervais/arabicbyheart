import { VocabularyCategory } from "@/model"
import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import RightArrowIcon from "@/images/rightArrow"
import SaveIcon from "@/images/save"
import CloseIcon from "@/images/close"
import Tooltip from "react-tooltip"
import { Toggle } from "@/ui/components"

import { HomeProps, HomeState } from "../model"
import { createVocabularyCategory } from "../functions"
import { goToCategory } from "../functions/goToCategory"

import { HomeStyled } from "./HomeStyled"
import { VocabularyCategoryStyled } from "./VocabularyCategoryStyled"

export class HomeClass extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      newCategoryTitle: "",
      isCreatingCategory: false,
      _idMap: {}

    }
  }

  render(): JSX.Element {
    const { vocabularyCategoryList, say, selectedLanguage } = this.props
    const { isCreatingCategory, newCategoryTitle, _idMap } = this.state
    return (
      <HomeStyled>
        {!isCreatingCategory && (
          <div className="add-button" onClick={() => this.setState({ isCreatingCategory: true })}>
            {say.addCategory}
          </div>
        )}
        {isCreatingCategory && (
          <div className="input">
            <input
              placeholder={say.categoryPlacehoder}
              value={newCategoryTitle}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => this.setState({ newCategoryTitle: evt.target.value })}
            />
            <Tooltip effect="solid" place="bottom" />


            <SaveIcon
              data-tip={say.save}
              onClick={() => createVocabularyCategory(newCategoryTitle, () => this.setState({ newCategoryTitle: "" }))}
            />
            <CloseIcon data-tip={say.cancel} onClick={() => this.setState({ newCategoryTitle: "", isCreatingCategory: false })} />
          </div>
        )}
        <div className="category-list">
          {vocabularyCategoryList.map((category: VocabularyCategory) => (
            <VocabularyCategoryStyled
              key={category._id}
              onClick={() => goToCategory(_idMap, category)}
            >
              <Toggle active={_idMap[category._id]} onChange={(evt: React.MouseEvent<HTMLDivElement>) => {
                evt.stopPropagation()
                this.setState({ _idMap: { ..._idMap, [category._id]: !_idMap[category._id] } })
              }} />
              <h1>{category.title[selectedLanguage] || say.category}</h1>
              <RightArrowIcon />
            </VocabularyCategoryStyled>
          )
          )}
        </div>
      </HomeStyled>
    )
  }
}

export const Home = connect((state: ReduxState): HomeProps => ({
  say: state.say,
  vocabularyCategoryList: state.vocabularyCategoryList,
  selectedLanguage: state.selectedLanguage
}))(HomeClass)