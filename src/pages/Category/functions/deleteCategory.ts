import { cloneCategory } from "@/functions"
import { VocabularyCategory } from "@/model"
import { setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import localforage from "localforage"

import { CategoryClass } from "../components/Category"


export function deleteCategory(this: CategoryClass): void {
  const { selectedCategory, vocabularyCategoryList } = this.props
  if (!selectedCategory) {
    return
  }
  allRequests.deleteCategory(selectedCategory._id).then(() => {
    const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
      .filter((category: VocabularyCategory) => category._id !== selectedCategory._id)
    setReduxState({
      selectedCategory: undefined,
      page: "home",
      vocabularyCategoryList: newVocabularyCategoryList
    })
    localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
  })
}