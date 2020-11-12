import { VocabularyCategory } from "@/model"

import { cloneVocabularyGroup } from "./cloneVocabularyGroup"

export function cloneCategory(category: VocabularyCategory): VocabularyCategory {
  const newCategory = { ...category }
  newCategory.languageList = [...newCategory.languageList]
  newCategory.items.map(cloneVocabularyGroup)
  return newCategory
}