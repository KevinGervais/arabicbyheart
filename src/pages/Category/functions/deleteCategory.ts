import { cloneCategory } from "@/functions"
import { VocabularyCategory } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import localforage from "localforage"


export function deleteCategory(): void {
  const { selectedCategory, vocabularyCategoryList } = getReduxState()
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