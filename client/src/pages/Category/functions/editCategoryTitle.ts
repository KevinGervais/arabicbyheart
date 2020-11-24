import { cloneCategory } from "@/functions"
import { VocabularyCategory } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import localforage from "localforage"

export function editCategoryTitle(newTitle: string, callback: () => void): void {
  const { selectedCategory, selectedLanguage, vocabularyCategoryList } = getReduxState()
  if (!selectedCategory || newTitle === "") {
    return
  }
  const newSelectedCategory = cloneCategory(selectedCategory)
  newSelectedCategory.title[selectedLanguage] = newTitle
  allRequests.addOrUpdateCategory({
    title: newSelectedCategory.title,
    _id: newSelectedCategory._id,
    isPublic: newSelectedCategory.isPublic
  }).then(() => {
    const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
    const categoryIndex = newVocabularyCategoryList.findIndex((currentCategory: VocabularyCategory) => currentCategory._id === newSelectedCategory._id)
    newVocabularyCategoryList[categoryIndex] = newSelectedCategory
    setReduxState({
      selectedCategory: newSelectedCategory,
      vocabularyCategoryList: newVocabularyCategoryList
    })
    localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
    callback()
  })
}