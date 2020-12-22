import { Languages, Say } from "@/languages/model"
import { BookmarkItem, DiapositiveSettings, NotchPosition, SelectedCategory, VocabularyCategory, VocabularyItem } from "@/model"
import { AllColors } from "@/styles/model"
import { PageNames } from "@/routes/model"
import { Action } from "redux"


export interface ReduxState {
  readonly notchPosition: NotchPosition
  readonly themeColor: keyof AllColors
  readonly selectedLanguage: Languages
  readonly say: Say
  readonly page: PageNames
  readonly selectedCategory?: SelectedCategory
  readonly vocabularyCategoryList: VocabularyCategory[]
  readonly selectedVocabularyItem?: VocabularyItem
  readonly diapositiveSettings?: DiapositiveSettings
  readonly bookmarks: BookmarkItem[]

}

export interface SetAction extends Action {
  data: Partial<ReduxState>
}
