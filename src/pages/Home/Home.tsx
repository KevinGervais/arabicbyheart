import { VocabularyCategory } from "@/model"
import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import RightArrowIcon from "@/images/rightArrow"
import SaveIcon from "@/images/save"
import CloseIcon from "@/images/close"
import { setReduxState } from "@/redux"
import { generateId } from "@/functions"
import localforage from "localforage"

import { HomeStyled } from "./HomeStyled"
import { HomeProps, HomeState } from "./model"
import { VocabularyCategoryStyled } from "./VocabularyCategoryStyled"
export class HomeClass extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      newCategoryTitle: "",
      newCategoryVocabularyCount: "",
      isCreatingCategory: false
    }
  }
  createVocabularyCategory = (): void => {
    const { vocabularyCategoryList } = this.props
    const { newCategoryTitle, newCategoryVocabularyCount } = this.state
    const columnCount = Number(newCategoryVocabularyCount || 1)

    const newCategory: VocabularyCategory = {
      columnCount,
      title: newCategoryTitle,
      items: [],
      _id: generateId()
    }

    const newVocabularyCategoryList: VocabularyCategory[] = [...vocabularyCategoryList]
    newVocabularyCategoryList.push(newCategory)

    localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
    setReduxState({ vocabularyCategoryList: newVocabularyCategoryList })
  }
  render(): JSX.Element {
    const { vocabularyCategoryList, say } = this.props
    const { isCreatingCategory, newCategoryTitle, newCategoryVocabularyCount } = this.state
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
            <input
              placeholder={say.vocabularyCount}
              value={newCategoryVocabularyCount}
              type="number"
              min="1"
              max="5"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => this.setState({ newCategoryVocabularyCount: evt.target.value })}
            />
            <SaveIcon onClick={this.createVocabularyCategory} />
            <CloseIcon onClick={() => this.setState({ newCategoryTitle: "", isCreatingCategory: false })} />
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
              <h1>{category.title || say.category}</h1>
              <RightArrowIcon />
            </VocabularyCategoryStyled>
          ))}
        </div>
      </HomeStyled>
    )
  }
}

export const Home = connect((state: ReduxState): HomeProps => ({
  say: state.say,
  vocabularyCategoryList: state.vocabularyCategoryList
}))(HomeClass)