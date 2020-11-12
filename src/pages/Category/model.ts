import { Say } from "@/languages/model"
import { diapositiveDelay, DiapositiveSettings, SpeechLanguages, VocabularyCategory } from "@/model"

export interface CategoryProps {
  readonly say: Say
  readonly selectedCategory?: VocabularyCategory
  readonly vocabularyCategoryList: VocabularyCategory[]
  readonly diapositiveSettings?: DiapositiveSettings
}

export interface CategoryState {
  readonly isCreatingVocabulary: boolean
  readonly isBottomMenuOpened: boolean
  readonly recordingIndex: number
  readonly titleList: string[]
  readonly audioList: string[]
  readonly languageList: SpeechLanguages[]
  readonly isTitlesFromListActive: boolean[]
  readonly isMicrophone: boolean
  readonly isCreatingWithImage: boolean
  readonly isDiaporamaImage: boolean
  readonly isShuffle: boolean
  readonly delay: diapositiveDelay
  readonly isAskingDelete: boolean
}


export interface BottomMenuItemStyledProps {
  readonly isActive: boolean
}

export interface CategoryInitState {
  titleList: string[]
  audioList: string[]
  languageList?: SpeechLanguages[]
  isTitlesFromListActive?: boolean[]
  isCreatingWithImage?: boolean
  isDiaporamaImage?: boolean
}