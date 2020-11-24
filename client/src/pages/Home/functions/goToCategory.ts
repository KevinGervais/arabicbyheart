import { ALL_UI_LANGUAGES } from "@/constants"
import { Languages } from "@/languages/model"
import { CategoryTitle, VocabularyCategory, VocabularyItem } from "@/model"
import { getReduxState, setReduxState } from "@/redux"

import { IdMap } from "../model"

export function goToCategory(_idMap: IdMap): void {
  const { vocabularyCategoryList } = getReduxState()
  const trueIDList = Object.entries(_idMap)
    .filter(([_id, isActive]: [string, boolean | undefined]) => isActive)
    .map(([_id]: [string, boolean | undefined]) => _id)
  const items: VocabularyItem[] = []
  const title: CategoryTitle = {} as CategoryTitle

  ALL_UI_LANGUAGES.forEach((language: Languages) => {
    title[language] = ""
  })
  vocabularyCategoryList.forEach((catItem: VocabularyCategory) => {
    if (trueIDList.includes(catItem._id)) {
      items.push(...catItem.items)
      ALL_UI_LANGUAGES.forEach((lang: Languages) => (
        title[lang] = title[lang] ? `${title[lang]} - ${catItem.title[lang]}` : catItem.title[lang]
      ))
    }
  })
  setReduxState({
    selectedCategory: {
      items,
      title,
      _id: "123456789",
      isPublic: false,
      isMultipleCategory: true
    }, page: "category"
  })
}