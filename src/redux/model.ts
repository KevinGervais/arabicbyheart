import { Languages, Say } from "@/languages/model"
import { DiapositiveSettings, NotchPosition, VocabularyCategory } from "@/model"
import { AllColors } from "@/styles/model"
import { PageNames } from "@/ui/routes/model"
import { Action } from "redux"


export interface ReduxState {
  notchPosition: NotchPosition
  themeColor: keyof AllColors
  selectedLanguage: Languages
  say: Say
  page: PageNames
  selectedCategory?: VocabularyCategory
  vocabularyCategoryList: VocabularyCategory[]
  diapositiveSettings?: DiapositiveSettings

}

export interface SetAction extends Action {
  data: Partial<ReduxState>
}
