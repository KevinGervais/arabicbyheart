import { Languages, Say } from "@/languages/model"
import { DiapositiveSettings, SpeechLanguages, VocabularyCategory, VocabularyItem, LanguageItem, LanguageItems } from "@/model"

export interface DiapositiveProps {
  readonly say: Say
  readonly selectedCategory?: VocabularyCategory
  readonly diapositiveSettings?: DiapositiveSettings
  readonly selectedLanguage: Languages
}

export interface DiapositiveState {
  readonly currentIndex: number
  readonly timeCounter: number | false
}

export interface DiapositiveStyledProps {
  readonly index: number
  readonly indexCount: number
}

export interface DiapositiveItemProps {
  readonly currentDiapositiveItem: DiapositiveItemObject
  readonly selectedLanguage: Languages
  readonly isImage: boolean
  readonly isHarakat: boolean
  readonly say: Say
}

export interface DiapositiveItemState {
  readonly isAnswerShown: boolean
}

export interface DiapositiveItemObject {
  readonly image?: string
  readonly isImageOnly: boolean
  readonly language: SpeechLanguages
  readonly currentLanguageItem: LanguageItem
  readonly languageItems: LanguageItems
}