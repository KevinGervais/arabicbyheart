import { Say } from "@/languages/model"
import { DiapositiveSettings, SpeechLanguages, VocabularyCategory, VocabularyGroup, VocabularyItem } from "@/model"

export interface DiapositiveProps {
  readonly say: Say
  readonly selectedCategory?: VocabularyCategory
  readonly diapositiveSettings?: DiapositiveSettings
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
  readonly currentVocabularyGroup: VocabularyGroup
  readonly currentVocabularyItem: DiapositiveItemObject
  readonly languageList: SpeechLanguages[]
  readonly isImage: boolean
  readonly isHarakat: boolean
  readonly say: Say
}

export interface DiapositiveItemState {
  readonly isAnswerShown: boolean
}

export interface DiapositiveItemObject extends VocabularyItem {
  readonly image?: string
  readonly isImageOnly: boolean
}