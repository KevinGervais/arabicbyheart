import { Theme } from "./styles/model"

declare global {
  interface Window {
    platform: any
    theme: Theme
    require: { context: any }
    cordova: any,
    StatusBar: any
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
  title: string
  columnCount: number
  languageList: SpeechLanguages[]
  items: VocabularyGroup[]
  isPublic: boolean
  _id: string
}

export interface VocabularyGroup {
  _id: string
  list: VocabularyItem[]
  image?: string
}

export interface VocabularyItem {
  _id: string
  title: string
  audio?: string
}

export type diapositiveDelay = 2 | 3 | 5 | 10 | 15 | false

export type SpeechLanguages = "fr" | "en" | "ar"

export interface DiapositiveSettings {
  isTitlesFromListActive: boolean[]
  isMicrophone: boolean
  isShuffle: boolean
  delay: diapositiveDelay
  isImage: boolean
}

export type RequestPaths = "category" | "vocabulary" | "vocabularyDeleted"