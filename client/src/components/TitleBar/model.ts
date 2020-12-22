import { Languages, Say } from "@/languages/model"
import { SelectedCategory, VocabularyItem } from "@/model"
import { AllColors } from "@/styles/model"
import { PageNames } from "@/routes/model"

export interface TitleBarState {
  readonly isFullScreen: boolean
  readonly isEditingCategory: boolean
  readonly categoryTitle: string
}

export interface TitleBarProps {
  readonly selectedVocabularyItem?: VocabularyItem
  readonly themeColor: keyof AllColors
  readonly page: PageNames
  readonly say: Say
  readonly selectedCategory?: SelectedCategory
  readonly selectedLanguage: Languages
}

export interface TitleBarStyledProps {
  readonly page: PageNames
}