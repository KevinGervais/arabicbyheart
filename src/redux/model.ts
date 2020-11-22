import { Languages, Say } from "@/languages/model"
import { DiapositiveSettings, NotchPosition, SelectedCategory, VocabularyCategory } from "@/model"
import { AllColors } from "@/styles/model"
import { PageNames } from "@/ui/routes/model"
import { Action } from "redux"


export interface ReduxState {
  readonly notchPosition: NotchPosition
  readonly themeColor: keyof AllColors
  readonly selectedLanguage: Languages
  readonly say: Say
  readonly page: PageNames
  readonly selectedCategory?: SelectedCategory
  readonly vocabularyCategoryList: VocabularyCategory[]
  readonly diapositiveSettings?: DiapositiveSettings

}

export interface SetAction extends Action {
  data: Partial<ReduxState>
}
