import { VocabularyCategory } from "@/model"

import { cloneVocabularyItem } from "./cloneVocabularyItem"

export function cloneCategory(category: VocabularyCategory): VocabularyCategory {
  const newCategory = { ...category }
  newCategory.items.map(cloneVocabularyItem)
  return newCategory
}