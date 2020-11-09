import { VocabularyCategory } from "@/model"
import { setReduxState } from "@/redux"
import localforage from "localforage"

import { CategoryClass } from "../components/Category"


export function deleteCategory(this: CategoryClass): void {
  const { selectedCategory, vocabularyCategoryList } = this.props
  if (!selectedCategory) {
    return
  }
  const newVocabularyCategoryList = [...vocabularyCategoryList]
    .filter((category: VocabularyCategory) => category._id !== selectedCategory._id)
  setReduxState({
    selectedCategory: undefined,
    page: "home",
    vocabularyCategoryList: newVocabularyCategoryList
  })
  localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
}