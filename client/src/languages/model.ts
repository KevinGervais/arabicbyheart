import { en } from "./en"

export type Say = {
  [key in keyof typeof en]: string
}

export type Languages = "en" | "fr"

export interface LanguageReduxInitState {
  selectedLanguage: Languages
  say: Say
}



