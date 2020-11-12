import { cloneCategory } from "@/functions"
import { VocabularyCategory } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import localforage from "localforage"

import { CategoryClass } from "../components/Category"

export function deleteItem(this: CategoryClass, index: number): void {
  const { selectedCategory } = this.props
  const { vocabularyCategoryList } = getReduxState()
  const newSelectedCategory: VocabularyCategory = cloneCategory(selectedCategory as VocabularyCategory)
  newSelectedCategory.items.splice(index, 1)
  const categoryIndex = vocabularyCategoryList
    .findIndex((category: VocabularyCategory) => category._id === newSelectedCategory._id)
  const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
  newVocabularyCategoryList[categoryIndex] = newSelectedCategory
  setReduxState({
    selectedCategory: newSelectedCategory,
    vocabularyCategoryList: newVocabularyCategoryList
  })
  localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
}