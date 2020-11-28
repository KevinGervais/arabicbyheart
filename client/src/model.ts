import { Languages } from "./languages/model"
import { Theme } from "./styles/model"

declare global {
  interface Window {
    platform: any
    theme: Theme
    require: { context: any }
    cordova: any,
    StatusBar: any
    responsiveVoice: any
    device?: {
      available: boolean
      cordova: string
      isVirtual: boolean
      manufacturer: string
      model: string
      platform: string
      serial: string
      uuid: string
      version: string
    }
    currentCalculatorState: any
  }
}

export type NotchPosition = "left" | "right" | "top" | "bottom" | undefined

export interface VocabularyCategory {
  title: CategoryTitle
  items: VocabularyItem[]
  isPublic: boolean
  _id: string
}

export interface SelectedCategory extends VocabularyCategory {
  isMultipleCategory?: boolean
}
export interface VocabularyItem {
  _id: string
  image?: string
  languageItems: LanguageItems
}
export type CategoryTitle = {
  [key in Languages]: string
}

export type LanguageItems = {
  [key in SpeechLanguages]: LanguageItem
}
export interface LanguageItem {
  _id: string
  title: string
}

export type diapositiveDelay = 2 | 3 | 5 | 10 | 15 | false

export type SpeechLanguages = "fr" | "en" | "ar"

export interface DiapositiveSettings {
  isSelectedTitleActive: boolean
  isArabicTitleActive: boolean
  isMicrophone: boolean
  isShuffle: boolean
  delay: diapositiveDelay
  isImage: boolean
  isHarakat: boolean
}

export type RequestPaths = "category" | "vocabulary" | "vocabularyDeleted"