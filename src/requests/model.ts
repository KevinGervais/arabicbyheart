import { CategoryTitle, LanguageItems } from "@/model"

export interface AddCategoryQuery {
  title: CategoryTitle
  isPublic: boolean
  _id: string
}

export interface AddVocabularyQuery {
  image?: string,
  categoryId: string,
  languageItems: LanguageItems
  _id: string,
}

export interface GetVocabularyQuery {
  image?: string
  categoryId: string,
  languageItems: LanguageItems
  _id: string
}
export interface GetDeletedItemsQuery {
  categoryId?: string,
  vocabularyItemId?: string
}