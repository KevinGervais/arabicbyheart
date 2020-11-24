import * as languages from "../languages"

import { LanguageReduxInitState, Languages } from "./model"

let selectedLanguage: Languages = (window.localStorage.getItem("selectedLanguage")
  || navigator.language.split("-")[0]) as Languages

if (!languages[selectedLanguage]) {
  selectedLanguage = "en"
}

export const languageReduxInitState: LanguageReduxInitState = {
  selectedLanguage,
  say: languages[selectedLanguage],
}
