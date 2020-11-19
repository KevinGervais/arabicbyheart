import { LanguageItem, LanguageItems } from "@/model"

export interface AddCategoryRequestResult {
  title: string
  isPublic: boolean
  _id: string
}

export interface AddVocabularyRequestResult {
  image?: string,
  categoryId: string,
  languageItems: LanguageItems
  _id: string,
}

export interface GetVocabularyRequestResult {
  image?: string
  categoryId: string,
  languageItems: LanguageItems
  _id: string
}
export interface GetDeletedItemsRequestResult {
  categoryId?: string,
  vocabularyItemId?: string
}