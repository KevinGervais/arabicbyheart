import { cloneCategory } from "@/functions"
import { VocabularyCategory } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import localforage from "localforage"

export function deleteItem(index: number, callback: () => void): void {
  const { vocabularyCategoryList, selectedCategory } = getReduxState()
  const newSelectedCategory: VocabularyCategory = cloneCategory(selectedCategory as VocabularyCategory)
  const vocabularyItemId = newSelectedCategory.items[index]._id

  allRequests.deleteVocabulary(vocabularyItemId, newSelectedCategory._id).then(() => {
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
    callback()
  })
}