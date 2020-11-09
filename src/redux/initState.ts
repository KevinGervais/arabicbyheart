import { uiReduxInitState } from "@/ui/initState"
import { languageReduxInitState } from "@/languages/initState"
import { AllColors } from "@/styles/model"

import { ReduxState } from "./model"

const diapositiveSettingsString = localStorage.getItem("diapositiveSettings")
const diapositiveSettings = diapositiveSettingsString ? JSON.parse(diapositiveSettingsString) : undefined


export const initState: ReduxState = {
  vocabularyCategoryList: [],
  selectedCategory: undefined,
  themeColor: (localStorage.getItem("themeColor") as keyof AllColors | null) || "lightblue",
  diapositiveSettings,
  ...uiReduxInitState,
  ...languageReduxInitState,
}