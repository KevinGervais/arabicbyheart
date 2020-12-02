export type Say = {
  [key in SayKeywords]: string
}

export type Languages = "en" | "fr"

export interface LanguageReduxInitState {
  selectedLanguage: Languages
  say: Say
}

export type SayKeywords =
  | "home"
  | "category"
  | "diapositive"
  | "addCategory"
  | "categoryPlacehoder"
  | "addVocabulary"
  | "vocabularyTitle"
  | "vocabularyPlacehoder"
  | "en"
  | "fr"
  | "ar"
  | "askDelete"
  | "yes"
  | "badBrowser"
  | "showAnswer"
  | "isWithImage"
  | "wordDefinition"
  | "save"
  | "cancel"
  | "delete"
  | "diapositiveSettings"
  | "playDiapositive"
  | "language"
  | "image"
  | "sound"
  | "shuffle"
  | "transitionDelay"
  | "record"
  | "harakat"
  | "edit"
  | "bookmarks"


