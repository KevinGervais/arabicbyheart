import { Say } from "@/languages/model"
import { diapositiveDelay, DiapositiveSettings, SpeechLanguages, VocabularyCategory } from "@/model"

export interface CategoryProps {
  say: Say
  selectedCategory?: VocabularyCategory
  vocabularyCategoryList: VocabularyCategory[]
  diapositiveSettings?: DiapositiveSettings
}

export interface CategoryState {
  isCreatingVocabulary: boolean
  isBottomMenuOpened: boolean
  recordingIndex: number
  titleList: string[]
  audioList: string[]
  languageList: SpeechLanguages[]
  isTitlesFromListActive: boolean[]
  isMicrophone: boolean
  isDiaporamaImage: boolean
  isShuffle: boolean
  delay: diapositiveDelay
  isAskingDelete: boolean
}

export interface BottomMenuItemStyledProps {
  isActive: boolean
}