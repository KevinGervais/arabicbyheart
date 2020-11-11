import { Say } from "@/languages/model"
import { DiapositiveSettings, SpeechLanguages, VocabularyCategory, VocabularyGroup, VocabularyItem } from "@/model"

export interface DiapositiveProps {
  say: Say
  selectedCategory?: VocabularyCategory
  diapositiveSettings?: DiapositiveSettings
}

export interface DiapositiveState {
  currentIndex: number
  timeCounter: number | false
}

export interface DiapositiveStyledProps {
  index: number
}

export interface DiapositiveItemProps {
  currentVocabularyGroup: VocabularyGroup
  currentVocabularyItem: DiapositiveItemObject
  languageList: SpeechLanguages[]
  isImage: boolean
  say: Say
}

export interface DiapositiveItemState {
  isAnswerShown: boolean
}

export interface DiapositiveItemObject extends VocabularyItem {
  image?: string
  isImageOnly: boolean
}