import { ALL_UI_LANGUAGES } from "@/constants"
import { generateId, cloneCategory } from "@/functions"
import { Languages } from "@/languages/model"
import { VocabularyCategory, CategoryTitle } from "@/model"
import { getReduxState, setReduxState } from "@/redux"
import { allRequests } from "@/requests"
import localforage from "localforage"

export function createVocabularyCategory(newCategoryTitle: string, callback: () => void): void {
  const { vocabularyCategoryList, selectedLanguage } = getReduxState()
  if (!newCategoryTitle) {
    return
  }
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
    callback()
  })
}