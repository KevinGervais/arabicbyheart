import { CategoryTitle, VocabularyCategory } from "@/model"
import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import RightArrowIcon from "@/images/rightArrow"
import SaveIcon from "@/images/save"
import CloseIcon from "@/images/close"
import { setReduxState } from "@/redux"
import { cloneCategory, generateId } from "@/functions"
import localforage from "localforage"
import Tooltip from "react-tooltip"
import { allRequests } from "@/requests"
import { ALL_UI_LANGUAGES } from "@/constants"
import { Languages } from "@/languages/model"

import { HomeStyled } from "./HomeStyled"
import { HomeProps, HomeState } from "./model"
import { VocabularyCategoryStyled } from "./VocabularyCategoryStyled"

export class HomeClass extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      newCategoryTitle: "",
      isCreatingCategory: false,
    }
  }
  createVocabularyCategory = (): void => {
    const { vocabularyCategoryList, selectedLanguage } = this.props
    const { newCategoryTitle } = this.state
    const title: any = {}
    ALL_UI_LANGUAGES.forEach((lang: Languages) => (
      lang === selectedLanguage ? title[lang] = newCategoryTitle : ""
    ))
    const newCategory: VocabularyCategory = {
      title: title as CategoryTitle,
      items: [],
      isPublic: true,
      _id: generateId()
    }
    allRequests.addOrUpdateCategory({
      title: newCategory.title,
      _id: newCategory._id,
      isPublic: newCategory.isPublic
    }).then(() => {
      const newVocabularyCategoryList: VocabularyCategory[] = vocabularyCategoryList.map(cloneCategory)
      newVocabularyCategoryList.push(newCategory)

      localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
      setReduxState({ vocabularyCategoryList: newVocabularyCategoryList })
      this.setState({ newCategoryTitle: "" })
    })
  }
  render(): JSX.Element {
    const { vocabularyCategoryList, say, selectedLanguage } = this.props
    const { isCreatingCategory, newCategoryTitle } = this.state
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

            <SaveIcon data-tip={say.save} onClick={this.createVocabularyCategory} />
            <CloseIcon data-tip={say.cancel} onClick={() => this.setState({ newCategoryTitle: "", isCreatingCategory: false })} />
          </div>
        )}
        <div className="category-list">
          {vocabularyCategoryList.map((category: VocabularyCategory) => (
            <VocabularyCategoryStyled
              key={category._id}
              onClick={() => {
                setReduxState({ selectedCategory: category, page: "category" })
              }}
            >
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