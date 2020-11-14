import { SpeechLanguages, VocabularyItem } from "@/model"

export interface AddCategoryRequestResult {
  title: string
  columnCount: number
  languageList: SpeechLanguages[]
  isPublic: boolean
  _id: string
}

export interface AddVocabularyRequestResult {
  image?: string,
  _id: string,
  categoryId: string,
  list: VocabularyItem[]
  languageList?: SpeechLanguages[]
}

export interface GetVocabularyRequestResult {
  _id: string
  list: VocabularyItem[]
  image?: string
  categoryId: string,
}
export interface GetDeletedItemsRequestResult {
  categoryId?: string,
  groupId?: string
}