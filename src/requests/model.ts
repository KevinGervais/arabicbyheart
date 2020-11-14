import { SpeechLanguages, VocabularyItem } from "@/model"

export interface AddCategoryRequest {
  title: string
  columnCount: number
  languageList: SpeechLanguages[]
  isPublic: boolean
  _id: string
}

export interface AddVocabularyRequest {
  image?: string,
  _id: string,
  categoryId: string,
  list: VocabularyItem[]
  languageList?: SpeechLanguages[]
}