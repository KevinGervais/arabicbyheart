import { Languages, Say } from "@/languages/model"
import { diapositiveDelay, DiapositiveSettings, SpeechLanguages, VocabularyCategory } from "@/model"

export interface CategoryProps {
  readonly say: Say
  readonly selectedCategory?: VocabularyCategory
  readonly vocabularyCategoryList: VocabularyCategory[]
  readonly diapositiveSettings?: DiapositiveSettings
  readonly selectedLanguage: Languages
}

export interface CategoryState {
  readonly isCreatingVocabulary: boolean
  readonly isBottomMenuOpened: boolean
  readonly recordingLanguage: SpeechLanguages | undefined
  readonly selectedTitle: string
  readonly arabicTitle: string
  readonly selectedAudio: string
  readonly arabicAudio: string
  readonly isSelectedTitleActive: boolean
  readonly isArabicTitleActive: boolean
  readonly isHarakat: boolean
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
  selectedTitle: string
  selectedAudio: string
  arabicTitle: string
  arabicAudio: string
  isSelectedTitleActive: boolean
  isArabicTitleActive: boolean
  isCreatingWithImage?: boolean
  isDiaporamaImage?: boolean
}

export interface CreatedLanguageItemProps {
  isArabic?: boolean
}